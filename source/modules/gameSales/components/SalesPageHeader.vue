<template>
<ui-page-header :title="$t('sales')" class="page-header">

  <div slot="search" class="search">
    <ui-text-field
      :value="$route.query.search"
      :label="$t('search')"
      @input="$emit('search', $event)"
    />
  </div>

  <div slot="right" class="right">
    <ul class="switcher-list">
      <li
        v-for="type in renderTypes"
        :key="type"
        :class="{ active: type === $route.query.type }"
        class="switcher-list__item"
        @click="$emit('rerender', type)"
      >
        <icon
          :name="type"
          width="18"
          height="18"
          fill="#333"
          class="switcher-list__icon"
        />
      </li>
    </ul>

    <ui-button
      :text="$t('createNewSale')"
      @click="$emit('show-modal')"
    />
  </div>

</ui-page-header>
</template>

<script>
import Icon from '@/icons'
import {
  PageHeader as UiPageHeader,
  TextField as UiTextField,
  Button as UiButton
} from '@protocol-one/ui-kit'

export default {
  name: 'SalesPageHeader',

  inject: ['$i18n'],

  components: {
    Icon,
    UiPageHeader,
    UiTextField,
    UiButton
  },

  data () {
    return {
      renderTypes: ['table', 'calendar']
    }
  }
}
</script>

<style lang="scss" scoped>
$switcher-color: #EAEAEA;

.search {
  width: 192px;
}

.switcher-list {
  display: flex;
  align-items: center;
  margin: 0 33px 0 0;
  padding: 0;
  list-style-type: none;
  height: 32px;

  &__item {
    padding: 2px 15px 4px;
    border: 1px solid $switcher-color;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color .2s linear;

    &.active {
      cursor: default;
      background-color: $switcher-color;

      .switcher-list__icon {
        fill: #C4C4C4;
      }
    }

    &:first-child {
      padding-right: 10px;
      border-right: 0;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    &:last-child {
      padding-left: 10px;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }

  &__icon {
    transition: fill .2s linear;
  }
}
</style>
