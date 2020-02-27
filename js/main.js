'use strict';

var NAMES = [
  'Валера',
  'Толик',
  'Галя',
  'Зина',
  'Иннокентий'
];

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function shuffle(array) {
  var inputCopy = array.slice();
  var result = [];
  while (inputCopy.length !== 0) {
    result = inputCopy.splice(random(0, inputCopy.length - 1), 1);
  }
  return result;
}

function getMessage() {
  return shuffle(MESSAGES).slice(random(1, 2)).join(' ');
}

function getComment() {
  return {
    avatar: 'img/avatar-' + random(1, 6) + '.svg',
    message: getMessage(),
    name: NAMES[random(0, 6)]
  };
}

function getPosts() {
  var POSTS = [];
  for (var u = 1; u <= 25; u++) {
    var comments = [];
    for (var e = 0; e < random(1, 5); e++) {
      comments.push(getComment());
    }
    POSTS.push({
      url: 'photos/' + u + '.jpg',
      description: '',
      likes: random(15, 200),
      comments: comments
    });
  }
  return POSTS;
}

function fillPicture(target, template, NEW_POSTS) {
  for (var y = 0; y < NEW_POSTS.length; y++) {
    var current = document.querySelector(template).cloneNode(true);
    current.querySelector('.picture_img').src = NEW_POSTS[y]['url'];
    current.querySelector('.picture__likes').textContent = NEW_POSTS[y]['likes'];
    current.querySelector('.picture__comments').textContent = NEW_POSTS[y]['comments'];
    document.querySelector(target).appendChild(current);
  }
  return target;
}

var NEW_POSTS = getPosts();

fillPicture('.picture', '#picture', NEW_POSTS);

function showElement(element) {
  document.querySelector(element)
  .classList
  .remove('hidden');
}

function hideElement(element) {
  document.querySelector(element)
  .classList
  .add('hidden');
}

showElement('.big-picture');

function generateText() {
  for (var y = 0; y < NEW_POSTS[0]['comments'].length; y++) {
    var text = document.createTextNode(NEW_POSTS[0]['comments'][y]['message']);
  }
  return text;
}

function fillComment(block) {
  var blockElement = document.querySelector(block).cloneNode(true);
  blockElement.querySelector('.social__picture')
  .setAttribute('src', NEW_POSTS[0]['comments']['avatar'])
  .setAttribute('alt', NEW_POSTS[0]['comments']['name'])
  .setAttribute('width', 35)
  .setAttribute('height', 35);
  blockElement.querySelector('.socil__text')
  .appendChild(generateText);
  document.querySelector('.social__comments')
  .textContent(blockElement);
}

function fillBigPicture() {
  document.querySelector('.big-picture__img img')
  .setAttribute('src', NEW_POSTS[0]['url']);
  document.querySelector('.likes-count')
  .textContent = NEW_POSTS[0]['likes'];
  document.querySelector('.comments-count')
  .textContent = NEW_POSTS[0]['comments'].length;
  fillComment('.social__comment');
  document.querySelector('.social__caption')
  .textContent(NEW_POSTS[0]['description']);
}

fillBigPicture();

hideElement('.social__comment-count');
hideElement('.comments-loader');
document.querySelector('body')
.classList
.add('modal-open');
