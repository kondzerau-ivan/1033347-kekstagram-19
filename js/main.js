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
    result.push(inputCopy.splice(random(0, inputCopy.length - 1), 1)[0]);
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
    var current = document.querySelector(template)
      .content.querySelector('.picture').cloneNode(true);
    current.querySelector('.picture__img').src = NEW_POSTS[y]['url'];
    current.querySelector('.picture__likes').textContent = NEW_POSTS[y]['likes'];
    current.querySelector('.picture__comments').textContent = NEW_POSTS[y]['comments'];
    document.querySelector(target).appendChild(current);
  }
  return target;
}

var NEW_POSTS = getPosts();

fillPicture('.pictures', '#picture', NEW_POSTS);

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

function generateText() {
  for (var y = 0; y < NEW_POSTS[0]['comments'].length; y++) {
    var text = document.createTextNode(NEW_POSTS[0]['comments'][y]['message']);
  }
  return text;
}

function fillComment(block) {
  for (var g = 0; g < NEW_POSTS[0]['comments'].length; g++) {
    var blockElement = document.querySelector(block).cloneNode(true);
    var blockElementPicture = blockElement.querySelector('.social__picture');
    blockElementPicture.setAttribute('src', NEW_POSTS[0]['comments'][g]['avatar']);
    blockElementPicture.setAttribute('alt', NEW_POSTS[0]['comments'][g]['name']);
    blockElementPicture.setAttribute('width', 35);
    blockElementPicture.setAttribute('height', 35);
    blockElement.querySelector('.social__text').textContent = NEW_POSTS[0]['comments'][g]['message'];
    document.querySelector('.social__comments')
      .appendChild(blockElement);
  }
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
    .textContent = NEW_POSTS[0]['description'];
}

fillBigPicture();

hideElement('.social__comment-count');
hideElement('.comments-loader');

function onFileUploadChange() {
  showCustomImage();
  showElement('.img-upload__overlay');
  document.querySelector('body').classList.add('modal-open');
}

function onFileUploadCancelClick() {
  hideElement('.img-upload__overlay');
  document.querySelector('body').classList.remove('modal-open');
}

var fileUpload = document.querySelector('#upload-file');

fileUpload.addEventListener('change', onFileUploadChange);

var uploadCancel = document.querySelector('#upload-cancel');

uploadCancel.addEventListener('click', onFileUploadCancelClick);

var imgPreview = document.querySelector('.img-upload__preview > img');
var effectsPreview = document.querySelectorAll('.effects__preview');

function showCustomImage() {
  if (fileUpload.files) {
    var reader = new FileReader();

    reader.onload = function (element) {
      imgPreview.setAttribute('src', element.target.result);
      for (var x = 0; x < effectsPreview.length; x++) {
        effectsPreview[x].style.backgroundImage = 'url(' + element.target.result + ')';
      }
    };
  }
  reader.readAsDataURL(fileUpload.files[0]);
}
