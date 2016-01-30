/**
 * Module Dependencies
 */

import $ from 'jquery'
import page from 'page'
import socketio from 'socket.io-client'

let socket = socketio()

let $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function (ev) {
  let $this = $(this);
  let $article = $this.closest('.tv-show')
  let id = $article.data('id')

  socket.emit('vote', id)

  $article.toggleClass('liked')
})

$tvShowsContainer.on('click', 'button.chat', function (ev) {
  let $this = $(this)
  let $article = $this.closest('.tv-show')
  let id = $article.data('id')

  socket.emit('join', 'sshow-' + id)
  page('/chat/' + id)
})

$tvShowsContainer.on('keypress', '.chat-nick', function (ev) {
  let $this = $(this)
  let $chatInput = $('.chat-input')

  $chatInput.prop('disabled', $this.val().length === 0)
})

$tvShowsContainer.on('keypress', '.chat-input', function (ev) {
  let $this = $(this)
  let nick = $('.chat-nick').val()
  if (ev.which === 13) {
    let message = $this.val()

    socket.emit('message', { nick, message })
    addMessage(nick, message)

    $this.val('')
  }
})

socket.on('message', function (msg) {
  let { nick, message } = msg

  addMessage(nick, message)
})

socket.on('vote:done', vote => {
  let id = vote.id
  let $article = $tvShowsContainer.find('article[data-id=' + id + ']')
  let $count = $article.find('.count')
  $count.html(vote.count)
})

function addMessage (nick, message) {
  let $chatBody = $('.chat-body')
  $chatBody.append(`<p><b>${nick}:</b> ${message}</p>`)
}

export default $tvShowsContainer
