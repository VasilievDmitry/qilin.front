import axios from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import GeneralStore from '@/modules/gameGeneral/store';
import MediaStore from '@/modules/gameMedia/store';
import RatingsStore from '@/modules/gameRatings/store';
import DescriptionsStore from '@/modules/gameDescriptions/store';
import {GameInfo} from './types';

export interface ContentsItem {
  anchor: string;
  text: string;
}

export interface State {
  gameInfo: GameInfo;
  contents: ContentsItem[],
}

export default function GameStore(apiUrl: string) {
  const state: State = {
    gameInfo: null,
    contents: [{text: 'Cover', anchor: 'cover'}],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async save({ dispatch }, gameId) {
      await dispatch('General/save', gameId);
      await dispatch('Media/save', gameId);
      await dispatch('Ratings/save', gameId);
      await dispatch('Descriptions/save', gameId);
    },
    async initState({ commit }, gameId: string) {
      const gameInfo = await axios
        .get(`${apiUrl}/games/${gameId}`)
        .then(({ data }) => data);

      commit('updateGame', gameInfo);
    },
  };
  const mutations: MutationTree<State> = {
    updateGame: (state, value: GameInfo) => {state.gameInfo = value},
    updateContents: (state, value: ContentsItem[]) => {state.contents = value},
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
    modules: {
      General: GeneralStore(apiUrl),
      Media: MediaStore(apiUrl),
      Ratings: RatingsStore(apiUrl),
      Descriptions: DescriptionsStore(apiUrl),
    }
  };
}
