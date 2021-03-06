<template>
<UiPageNavbar
  class="page-navbar"
  title="Qilin"
  :logo-link="logoLink"
  :is-authorised="hasAuth"
  :navigation-links="navigationLinks"
  :user-name="userName"
  @login="showAuth('login')"
  @register="showAuth('register')"
  @logout="$emit('logout')"
>
  <IconLogo slot="logo" />

  <template slot="bottom">
    <NotifierBell />
    <LocaleChanger class="locales" />
  </template>

  <Auth
    v-if="hasShownAuth"
    :type="authType"
    @close="hasShownAuth = false"
    @message="$emit('authMessage', $event)"
  />
</UiPageNavbar>
</template>

<script type="ts">
import Vue from 'vue';
import { UiPageNavbar } from '@protocol-one/ui-kit'
import Auth from '@/components/Auth.vue';
import IconLogo from '@/components/IconLogo.vue';
import LocaleChanger from '@/components/LocaleChanger.vue';
import NotifierBell from '@/components/NotifierBell.vue';

export default Vue.extend({
  components: { Auth, IconLogo, LocaleChanger, NotifierBell, UiPageNavbar },
  props: {
    /** User has auth */
    hasAuth: {
      default: false,
      type: Boolean,
    },
    /** Links for routing */
    links: {
      default: () => [],
      type: Array,
    },
    /** Name by auth user */
    userName: {
      default: '',
      type: String,
    },
  },

  data: () => ({
    authType: 'login',
    hasShownAuth: false,
    logoLink: {
      url: '/',
      router: true,
    },
  }),

  computed: {
    navigationLinks() {
      return this.links.map(item => ({
        url: item.href,
        label: item.title,
        isActive: item.isActive,
        router: true,
      }));
    },
  },
  methods: {
    showAuth(type) {
      this.authType = type;
      this.hasShownAuth = true;
    },
  },
});
</script>

<style scoped lang="scss">
.page-navbar {
  @media print {
    display: none;
  }
}

.locales {
  padding-left: 16px;
}
</style>
