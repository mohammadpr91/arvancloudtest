<template>
  <div>
    <p
      v-html="editMode ? 'Edit Article' : 'New Article'"
      class="q-mt-lg q-ml-lg text-h4">
    </p>
    <div class="row q-col-gutter-xl q-px-lg">
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <q-form
          class="q-mt-xl"
          @submit="onSubmit"
        >
          <q-input
            class="q-mb-lg"
            label="Title"
            stack-label
            v-model="article.title"
            :loading="detailLoading"
            outlined
            dense
            placeholder="Title"
            :rules=" [val => val && val != '' || 'Required field'] "
          />
          <q-input
            class="q-my-xl"
            label="Description"
            stack-label
            v-model="article.description"
            :loading="detailLoading"
            outlined
            dense
            placeholder="Description"
            :rules=" [val => val && val != '' || 'Required field'] "
          />
          <q-input
            class="q-mb-lg"
            label="Body"
            type="textarea"
            stack-label
            v-model="article.body"
            :loading="detailLoading"
            outlined
            dense
            :rules=" [val => val && val != '' || 'Required field'] "
          />
            <q-btn
              class="q-mt-md"
              color="primary"
              filled
              :loading="btnLoading"
              type=submit
              label="Submit"
              size="md"
            />
        </q-form>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-my-xl">
          <q-input
          class="q-mb-md"
          label="Tags"
          stack-label
          v-model="newTag"
          outlined
          dense
          placeholder="New tag"
          @keyup.enter="addNewTag"
        />
        <q-card flat bordered>
          <q-card-section>
            <q-option-group
              :options="tagOptions"
              type="checkbox"
              v-model="article.tagList"
              size="sm"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      detailLoading: false,
      btnLoading: false,
      editMode: false,
      newTag: '',
      tagOptions: []
    }
  },
  mounted () {
    this.getAllTags()
    if (this.$route.params.selectedSlug) {
      this.getSelectedArticle(this.$route.params.selectedSlug)
      this.editMode = true
    }
  },
  methods: {
    async getSelectedArticle (slug) {
      this.detailLoading = true
      let response = await this.$Service.request(
        'get',
          this.$Path.APP_PATH + '/articles/' + slug,
          {},
          false
        )
        if (response.status === 200) {
          this.detailLoading = false
          this.article = response.data.article
          response.data.article.tagList.forEach(item => {
            this.tagOptions.push({
              label: item, value: item
            })
            this.article.tagList.push(item)
          })
        } else {
          this.detailLoading = false
        }
    },
    async getAllTags () {
      let response = await this.$Service.request(
        "get",
        this.$Path.APP_PATH + '/tags',
        {},
        false
        )
        if (response.status === 200) {
          response.data.tags.sort().forEach(element => {
            this.tagOptions.push({
              label: element, value: element
            })
          });
        }
    },
    addNewTag () {
      this.tagOptions.push({
        label: this.newTag, value: this.newTag
      })
      this.article.tagList.push(this.newTag)
      this.newTag = ''
    },
    async onSubmit () {
      this.btnLoading = true
      if (this.editMode) {
        let response = await this.$Service.request(
          'put',
          this.$Path.APP_PATH + '/articles/' + this.$route.params.selectedSlug,
          this.article,
          true
        )
        if (response.status === 200) {
          this.btnLoading = false
          this.$router.push({ name: 'dashboard', params:{ articleUpdated: true } })
        } else {
          this.btnLoading = false
        }
      } else {
        let response = await this.$Service.request(
          'post',
          this.$Path.APP_PATH + '/articles',
          this.article,
          true
        )
        if (response.status === 200) {
          this.btnLoading = false
          this.$router.push({ name: 'dashboard', params:{ articleCreated: true } })
        } else {
          this.btnLoading = false
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .q-field--dense .q-field__label {
      top: -15px !important;
      font-size: 20px !important;
    }
    .q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
      background-color: var(--arv-white);;
    }
    .q-field__native {
      padding-top: 5px !important;
    }
    .q-card__section {
      height: 290px;
      overflow-y: auto;
    }
</style>