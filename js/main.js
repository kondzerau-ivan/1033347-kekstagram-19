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
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    array[i] = array[j];
    array[j] = array[i];
  }
  return array;
}

function message() {
  return shuffle(MESSAGES).slice(random(1, 2)).join(' ');
}

function comment() {
  return {
    avatar: 'img/avatar-' + random(1, 6) + '.svg',
    message: message,
    name: NAMES[random(0, 6)]
  };
}

var POSTS = [];

for (var u = 1; u <= 25; u++) {
  POSTS.push = {
    url: 'photos/' + u + '.jpg',
    description: '',
    likes: random(15, 200),
    comments: comment
  };
}

var picTemplate = document.querySelector('#picture');
var picElement = document.querySelector('.picture');

for (var y = 0; y < POSTS.length; y++) {
  var currentPicElement = picTemplate.cloneNode(true);
  currentPicElement.querySelector('.picture_img').src = POSTS[y]['url'];
  currentPicElement.querySelector('.picture__likes').textContent = POSTS[y]['likes'];
  currentPicElement.querySelector('.picture__comments').textContent = POSTS[y]['comments'];
  picElement.appendChild(currentPicElement);
}
