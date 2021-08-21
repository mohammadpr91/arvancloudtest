<template>
  <div>
    <p class="q-mt-lg q-ml-lg text-h4">
      All Post
    </p>
    <q-table
      class="my-sticky-dynamic"
      :data="tableData"
      :columns="tablecolumns"
      :loading="loading"
      row-key="index"
      :pagination.sync="pagination"
      @request="onRequestDataTable"
      binary-state-sort
    >
      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn-dropdown
            split
            color="info"
            push
            glossy
            no-caps
            icon="more_horiz"
          >
            <q-list>
              <q-item clickable v-close-popup @click="editItem(props.row)">
                <q-item-section>
                  <q-item-label>Edit</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="deleteItem(props.row)">
                <q-item-section>
                  <q-item-label>Delete</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber()"
        size="sm"
      />
    </div>
    <q-dialog
      v-model="deleteModal"
      persistent
    >
       <delete-modal
        @deleteItem="deleteArticle"
      />
    </q-dialog>
  </div>
</template>
<script>
import deleteModal from '../components/deleteModal'
export default {
  components: {
    deleteModal
  },
  data () {
    return {
      tableData: [],
      loading: false,
      deleteModal: false,
      selectedArticle: {},
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: ''
      },
      tablecolumns: [
        {
          name: 'index',
          label: '#',
          field: 'index',
          align: 'center'
        },
        {
          name: 'title',
          label: 'Title',
          field: 'title',
          align: 'center'
        },
        {
          name: 'author',
          label: 'Author',
          field: val => this.getNameAuthor(val.author),
          align: 'center'
        },
        {
          name: 'tags',
          label: 'Tags',
          field: val => this.getTagList(val.tagList),
          align: 'center'
        },
        {
          name: 'body',
          label: 'Excerpt',
          field: val => this.articleBody(val.body),
          align: 'center'
        },
        {
          name: 'createdAt',
          label: 'Created',
          field: val => this.convertTime(val.createdAt),
          align: 'center'
        },
        {
          name: "Action",
          align: "center"
        }
      ],
    }
  },
  mounted () {
    if (this.$route.params.articleCreated) {
      this.notification('Well done! Article created successfuly','positive')
    }
    if (this.$route.params.articleUpdated) {
      this.notification('Well done! Article updated successfuly','positive')
    }
    this.onRequestDataTable({
      pagination: this.pagination
    });
    this.pagesNumber()
  },
  methods: {
    pagesNumber () {
      return Math.ceil(this.tableData.length / this.pagination.rowsPerPage)
    },
    async onRequestDataTable (props) {
      this.pagination.rowsPerPage = props.pagination.rowsPerPage
      this.loading = true
      this.tableData = []
      let response = {}
      if (props.pagination.page === 1) {
        response = await this.$Service.request(
          "get",
          this.$Path.APP_PATH + '/articles/'+ `?limit=${props.pagination.rowsPerPage}`,
          {},
          false)
      } else {
        response = await this.$Service.request(
          "get",
          this.$Path.APP_PATH + '/articles/page'+ `?limit=${props.pagination.rowsPerPage}`,
          { 
            page: props.pagination.page
          },
          false)
      }

      if (response.status === 200) {
        this.loading = false
        this.pagination.rowsNumber = response.data.articlesCount
        response.data.articles.forEach(item => {
          this.tableData.push(item)
        })
        this.tableData.forEach((row, index) => {
          row.index = index
        })
      } else {
        this.loading = false
      }
      this.loading = false
    },
    getTagList (val) {
      if (val.length !== 0) return val.slice(0, 2)
    },
    convertTime (val) {
      let date = new Date(val)  
      return date.toDateString()
    },
    getNameAuthor (val) {
      return '@' + val.username
    },
    articleBody (val) {
      return val.substring(0, 21)
    },
    editItem (val) {
      let selectedSlug = val.slug
      this.$router.push({ name: 'newArticle', params:{ selectedSlug } })
    },
    deleteItem (val) {
      this.deleteModal = true
      this.selectedArticle = val
    },
    async deleteArticle (event) {
      response = await this.$Service.request(
          'delete',
          this.$Path.APP_PATH + '/articles/' + this.selectedArticle.slug,
          {},
          true
        )
        if (response.status === 200) {
          this.notification('Article deleted successfuly','positive')
          this.getArticles()
        }
    }
  }
}
</script>
<style lang="scss">
  .q-table__card {
    box-shadow: none;
  }
  .q-table {
    thead {
      tr {
        background-color: var(--arv-silver);
        height: 40px;
      }
    }
  }
</style>
