<template>
<UiModal
  class="modal-add-game"
  @close="$emit('close')"
>
  <UiHeader
    slot="header"
    level="2"
  >
    {{ $t('title') }}
  </UiHeader>
  <div slot="main">
    <div v-html="$t('description')"/>
    <UiTextField
      :value="search"
      :label="$t('search')"
      @input="inputSearch($event)"
    />
    <div class="games">
      <label
        v-for="game in foundGames"
        :key="game.id"
        class="item"
      >
        <UiCheckbox
          class="check"
          :checked="isChecked(game.id)"
          @change="switchGame(game.id)"
        />
        <span class="name">{{ game.internalName }}</span>
        <span class="date">{{ formatDate(game.releaseDate) }}</span>
      </label>
      <p v-if="!foundGames.length">
        {{ $t('not_found') }}
      </p>
    </div>
  </div>
  <div
    slot="footer"
    class="ui-modal-footer"
  >
    <UiButton
      @click="okClick"
    >
      {{ $t('ok') }}
    </UiButton>
  </div>
</UiModal>
</template>

<script type="ts">
import Vue from 'vue'
import {UiButton, UiCheckbox, UiHeader, UiModal, UiTextField} from '@protocol-one/ui-kit'
import {mapActions, mapGetters, mapState} from 'vuex';
import i18n from './i18nAddGame';
import formatDate from '@/helpers/formatDate';

export default Vue.extend({
  i18n,
  components: { UiModal, UiHeader, UiButton, UiTextField, UiCheckbox },
  data() {
    return {
      select: [],
      search: '',
      updateTimeout: null,
    }
  },
  computed: {
    ...mapGetters(['currentVendorId']),
    ...mapState('Package', ['foundGames']),
  },
  mounted() {
    this.fetchGames({ vendorId: this.currentVendorId });
  },
  methods: {
    ...mapActions('Package', ['fetchGames']),

    okClick() {
      this.$emit('close');
      this.$emit('ok', this.select);
    },
    inputSearch(value) {
      this.search = value;

      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(() => {
        this.fetchGames({
          query: this.search,
          vendorId: this.currentVendorId
        });
      }, 200);
    },
    isChecked(id) {
      return this.select.indexOf(id) > -1;
    },
    switchGame(id) {
      if (this.select.indexOf(id) > -1) {
        this.select = this.select.filter(gameId => gameId !== id);
      } else {
        this.select = this.select.concat([id]);
      }
    },
    formatDate(date) {
      return formatDate(
        date,
        'dd LLLL yyyy',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    }
  }
})
</script>

<style scoped lang="scss">
.modal-add-game {

}
.item {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  cursor: pointer;
  .check {
    width: 30px;
    margin-top: -2px;
  }
  .date {
    text-align: right;
    width: 150px
  }
  .name {
    flex: 1;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 500px;
  }
}
</style>
