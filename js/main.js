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

function getPost() {
  var POSTS = [];
  for (var u = 1; u <= 25; u++) {
    POSTS.push = {
      url: 'photos/' + u + '.jpg',
      description: '',
      likes: random(15, 200),
      comments: comment
    };
  }
  return POSTS;
}

function fillPicture(target, template, NEW_POSTS) {
  template = document.querySelector('#picture');
  target = document.querySelector('.picture');
  NEW_POSTS = getPost();

  for (var y = 0; y < NEW_POSTS.length; y++) {
    var current = template.cloneNode(true);
    current.querySelector('.picture_img').src = NEW_POSTS[y]['url'];
    current.querySelector('.picture__likes').textContent = NEW_POSTS[y]['likes'];
    current.querySelector('.picture__comments').textContent = NEW_POSTS[y]['comments'];
    target.appendChild(current);
  }
  return target;
}

fillPicture();
