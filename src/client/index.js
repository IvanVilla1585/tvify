/**
 * Module Dependencies
 */

import $ from 'jquery'
import page from 'page'
import { getShows, searchShows } from 'src/client/tvmaze-api-client'
import { renderShows, renderChat } from 'src/client/render'
import $tvShowsContainer from 'src/client/tv-shows-container'
import 'src/client/search-form'
import qs from 'qs'

page('/', function (ctx, next) {
  $tvShowsContainer.find('.tv-show').remove()
  getShows(function (shows) {
    $tvShowsContainer.find('.loader').remove();
    renderShows(shows);
  })
})

page('/search', function (ctx, next) {
  $tvShowsContainer.find('.tv-show').remove()
  var $loader = $('<div class="loader">');
  $loader.appendTo($tvShowsContainer);
  const busqueda = qs.parse(ctx.querystring)
  searchShows(busqueda, function (shows) {
    $loader.remove();
    renderShows(shows);
  })
})

page('/chat/:showId', function (ctx, next) {
  $tvShowsContainer.find('.tv-show').remove()
  renderChat(ctx.params.showId)
})

var productionEnv = !!~window.location.host.indexOf('github.io')

if (productionEnv) {
  page.base('/tvify')
}

page()
