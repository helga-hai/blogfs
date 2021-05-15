<template lang="pug">
  // Component template.
  .search(
    data-game-search)
    SearchField.search__field(
      :term="term",
      :close="active",
      @openField="$emit('openField', $event)",
      @input="loadByTerm")

    //transition(name="fade")
      GameSearchResult.game-search__result(
        v-if="term && active && !initLoading",
        //:total="total",
        //:result="result",
        //:replace="replace",
        //:recommend="recommend",
        @redirect="hideResults")
        template(#infinite)
          InfiniteLoading(
            @infinite="moreGames",
            //:identifier="term",
            v-if="hasMore")
            span(slot="no-more")
</template>

<script lang="ts">
  // import { mapGetters } from 'vuex';
  // import debounce from 'lodash/debounce';
  // import { RootHall } from '@/api/game/Hall';
  // import InfiniteLoading, { StateChanger } from 'vue-infinite-loading';
  // import { GamesResponse, getGamesUpdated } from '@/api/game';
  // import GameSearchField from './GameSearchField.vue';
  // import GameSearchResult from './GameSearchResult.vue';
  // import type { PropType } from 'vue';
  // import { Game } from '@/api/game/Detail';

  // Component data.
  interface Data {
    term: string;
    total: number;
    limit: number;
    result: [];
    active: boolean;
    recommend: [];
    initLoading: boolean;
  }

  // Single File Component.
  export default {
    // Name of the component.
    name: 'Search',
    // // Deps of the component.
    // components: {
    //   GameSearchField,
    //   GameSearchResult,
    //   InfiniteLoading,
    // },
    // Data of the component.
    data: (): Data => ({
      term: '',
      total: 0,
      limit: 20,
      result: [],
      active: false,
      recommend: [],
      initLoading: false,
    }),
    // // Props of the component.
    // props: {
    //   replace: {
    //     type: Boolean as PropType<boolean>,
    //   },
    // },
    // // Computed of the component.
    // computed: {
    //   ...mapGetters('account', ['isLogged', 'balance']),
    //   hasMore(): boolean {
    //     return this.total > this.limit && this.result?.length < this.total;
    //   },
    // },
    // Methods of the component.
    methods: {
    //   // Show found games in result popup.
    //   showResults(): void {
    //     this.active = true;
    //     this.$emit('showResults');
    //   },
    //   // Hide found games in result popup.
    //   hideResults(): void {
    //     this.active = false;
    //     this.$emit('hideResults');
    //   },
      loadByTerm(term: string): void {
    //     if (term) {
    //       this.searchGames(term);
    //
    //       if (!this.term) {
    //         this.initLoading = true;
    //       }
    //     } else this.emptyGames();
    //
    //     // Defined search term.
    //     this.term = term;
      },
    //   // Search the games by term (with debounce).
    //   searchGames: debounce(function (term: string): void {
    //     // Track term with gtm.
    //     this.trackTerm(term);
    //     // Search games by term.
    //     this.getGames(this.term).then(({ games, total }: GamesResponse): void => {
    //       // Total found games.
    //       this.total = total;
    //       // Found games by term.
    //       this.result = games;
    //       this.initLoading = false;
    //       // Retrieve recommend games in case it's not loaded.
    //       if (this.recommend?.length === 0)
    //         getGamesUpdated({ category: 'RECOMMENDED', limit: 5 }).then(({ games }: GamesResponse): void => {
    //           this.recommend = games;
    //         });
    //     });
    //   }, 300),
    //   emptyGames(): void {
    //     this.total = 0;
    //     this.result = [];
    //   },
    //   // Load more games with the same term.
    //   moreGames($state: StateChanger): void {
    //     this.getGames(this.term, this.result?.length).then(({ games, total }: GamesResponse): void => {
    //       // Adding more games to result.
    //       this.result = [...this.result, ...games];
    //       // In case total is same as loaded amount need to complete loader.
    //       if (total === this.result.length) $state.complete();
    //       else $state.loaded();
    //     });
    //   },
    //   // Load the games by term and offset.
    //   getGames(term: string, offset: number = 0): Promise<GamesResponse> {
    //     return getGamesUpdated({ category: RootHall.Search, gamePattern: term, limit: this.limit, offset })
    //       .then(
    //         ({ games, total }: GamesResponse): GamesResponse => {
    //           // Create regexp to replace found term to <span>.
    //           const replaceRegExp = new RegExp(term, 'gi');
    //
    //           return {
    //             // Total found games by term.
    //             total,
    //             // Map found games with additional mutations.
    //             games: games.map(
    //               (game: Game): Game => {
    //                 // Mutate game with additional span to identify found term in name.
    //                 game.name = game.name.replace(replaceRegExp, '<span class="game-name-term-found">$&</span>');
    //                 // Returns mutated game.
    //                 return game;
    //               }
    //             ),
    //           };
    //         }
    //       )
    //       .catch(
    //         (err: Error): Promise<GamesResponse> => {
    //           console.warn(err);
    //           return this.getGames(term, offset);
    //         }
    //       );
    //   },
    //   // Using analytics to track search term.
    //   trackTerm: debounce(function (term: string): void {
    //     this.$gtm.trackEvent({
    //       event: 'search:game',
    //       value: term,
    //     });
    //   }, 1000),
    },
    // // Watchers of the component.
    // watch: {
    //   term(): void {
    //     if (this.term) this.showResults();
    //     else if (this.$mq !== 'xs') this.hideResults();
    //   },
    // },
  };
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .search {
    position: relative;
    width: $search__width;

    &__result {
      width: $search-result__width;
      margin: $search-result__margin;
      z-index: $search-result__z-index;
      @include absolute(100%, 0, null, 0);
    }
  }
</style>
