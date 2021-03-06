<template>
<div class="capsule">
  <UiLangsBar
    :value="lang"
    :filled-list="filled"
    @change="selectLang"
  />
  <div class="list">
    <span>
      <UploadItem
        :upload-text="$t('upload_capsule')"
        :replace-text="$t('replace_capsule')"
        :remove-text="$t('remove_capsule')"
        :source="value.generic[lang] || ''"
        :is-small="true"
        @click="selectFile('generic')"
        @dropFile="file => uploadFile('generic', file)"
        @clickRemove="clickRemove('generic')"
      />
    </span><span>
      <UploadItem
        :upload-text="$t('upload_capsule')"
        :replace-text="$t('replace_capsule')"
        :remove-text="$t('remove_capsule')"
        :source="value.small[lang] || ''"
        :is-small="true"
        @click="selectFile('small')"
        @dropFile="file => uploadFile('small', file)"
        @clickRemove="clickRemove('small')"
      />
    </span>
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue'
  import {clone} from 'lodash-es'
  import {UiLangsBar} from '@protocol-one/ui-kit'
  import UploadItem from './UploadItem.vue'
  import {OpenFileDialog, UploadImage} from '../uploader'
  import i18n from '../i18n'

  export default Vue.extend({
    i18n,
    components: {UploadItem, UiLangsBar},
    props: {
      value: {
        type: Object,
        required: true,
        default: () => ({}),
      }
    },
    data() {
      return {
        lang: 'en'
      }
    },
    computed: {
      filled() {
        return Object
          .keys(this.value.generic)
          .filter(a => this.value.generic[a] || this.value.small[a]);
      }
    },
    methods: {
      selectLang(lang) {
        this.lang = lang;
      },
      clickRemove(type) {
        const value = clone(this.value, true);
        delete value[type][this.lang];
        this.$emit('change', value);
      },
      uploadFile(type, file) {
        UploadImage(file, {width: 1920, height: 800}, urls => {
          const value = clone(this.value, true);
          value[type][this.lang] = urls[0];
          this.$emit('change', value);
        });
      },
      selectFile(type) {
        OpenFileDialog('image/*', file => this.uploadFile(type, file));
      },
    }
  })
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    > * {
      flex: 0 0 50%;
      padding-bottom: 20px;
      &:nth-child(even) {
        padding-left: 10px;
      }
      &:nth-child(odd) {
        padding-right: 10px;
      }
    }
  }
  .capsule {
    margin-bottom: 30px;
  }
  .langs-bar {
    margin-bottom: 8px;
  }
</style>
