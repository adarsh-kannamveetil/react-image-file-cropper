import React from 'react';
import moment from 'moment';

const cdn = 'http://cdn.resto.com';

const menuOpen = function () {
  $('.sd-two').stop().animate({ left: '0px' }, 'fast');
};

const menuClose = function () {
  $('.sd-two').stop().animate({ left: '-270px' }, 'fast');
};

const formatDate = function (date) {
  return moment(date).fromNow();
};

const updatedDate = function (date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
};

const lastActivity = function (date) {
  return moment(date).format('Do MMMM YYYY, h:mm: A');
};

const joinedOn = function (date) {
  return moment(date).format('D MMM YYYY');
};

const getdays = function (to = null, from) {
  const fromDate = moment(from);
  const toDate = to ? moment(to) : moment();
  return fromDate.diff(toDate, 'days');
};

const charAvatar = function (fName, lName) {
  let avatar = '';
  const firstName = fName ? fName.trim() : '';
  const lastName = lName ? lName.trim() : '';
  if (lastName === '' || lastName == null) {
    avatar = firstName.substring(0, 2).toUpperCase();
  } else {
    avatar = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }
  return avatar;
};

const changeUrl = function (url) {
  const urlArr = url.split('/');
  return `${cdn}/${urlArr[3]}/${urlArr[4]}`;
};

const changeToCdnUrl = function (urlArray) {
  console.log('urlArray', urlArray);
  const cdnUrlArr = urlArray.map((url) => ({
    portfolio_id: url.portfolio_id,
    portfolio_image_url: changeUrl(url.portfolio_image_url),
  }));
  console.log('cdnUrlArr', cdnUrlArr);
  return cdnUrlArr;
};

export {
    menuOpen,
    menuClose,
    formatDate,
    updatedDate,
    charAvatar,
    changeToCdnUrl,
    lastActivity,
    joinedOn,
    getdays,
};
