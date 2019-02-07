import { RouteConfig } from 'vue-router';
import Home from '@/modules/home/Home.vue';
import OnBoarding from '@/modules/onboarding/OnBoarding.vue';
import Games from '@/modules/games/Games.vue';
import GameMedia from '@/modules/gameMedia/Media.vue';
import Game from '@/modules/game/Game.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/vendor/on-boarding',
    name: 'onBoarding',
    component: OnBoarding,
  },
  {
    path: '/games',
    name: 'games',
    component: Games,
  },
  {
    path: '/games/:id',
    name: 'game',
    component: Game,
    children: [
      {
        name: 'GameMedia',
        path: 'media',
        component: GameMedia
      },
    ],
  },
].map(route => ({ ...route, meta: `routes.${route.name}.meta` }));

export default routes;
