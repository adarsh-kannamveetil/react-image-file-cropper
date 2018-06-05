import { injectGlobal } from 'styled-components';

import TBWoff from 'font/tradegothic/TradeGothic-Bold.woff';
import TBttf from 'font/tradegothic/TradeGothic-Bold.ttf';

import XBdWoff from 'font/stone-sans/StoneSansIIITCW01-XBd.woff';
import XBdttf from 'font/stone-sans/StoneSansIIITCW01-XBd.ttf';

import MdWoff from 'font/stone-sans/StoneSansIIITCW01-Md.woff';
import Mdttf from 'font/stone-sans/StoneSansIIITCW01-Md.ttf';

import SmBdWoff from 'font/stone-sans/StoneSansIIITCW01-SmBd.woff';
import SmBdttf from 'font/stone-sans/StoneSansIIITCW01-SmBd.ttf';

import LtWoff from 'font/stone-sans/StoneSansIIITCW01-Lt.woff';
import Ltttf from 'font/stone-sans/StoneSansIIITCW01-Lt.ttf';

import SBIWoff from 'font/sentinel/Sentinel-BoldItalic.woff';
import SBIttf from 'font/sentinel/Sentinel-BoldItalic.ttf';

import BkWoff from 'font/stone-sans/StoneSansIIITCW01-Bk.woff';
import Bkttf from 'font/stone-sans/StoneSansIIITCW01-Bk.ttf';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @font-face {
    font-family: 'TradeGothic';
    src: url('font/tradegothic/TradeGothic-Bold.eot');
    src: url('font/tradegothic/TradeGothic-Bold.eot?#iefix') format('embedded-opentype'),
    url(${TBWoff}) format('woff'),
    url(${TBWoff}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
      font-family: 'StoneSansIIITCW01-XBd';
      src: url('font/stone-sans/StoneSansIIITCW01-XBd.eot');
      src: url('font/stone-sans/StoneSansIIITCW01-XBd.eot?#iefix') format('embedded-opentype'),
      url(${XBdWoff}) format('woff'),
      url(${XBdttf}) format('truetype');
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
      font-family: 'StoneSansIIITCW01-Md';
      src: url('font/stone-sans/StoneSansIIITCW01-Md.eot');
      src: url('font/stone-sans/StoneSansIIITCW01-Md.eot?#iefix') format('embedded-opentype'),
      url(${MdWoff}) format('woff'),
      url(${Mdttf}) format('truetype');
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
      font-family: 'StoneSansIIITCW01-Lt';
      src: url('font/stone-sans/StoneSansIIITCW01-Lt.eot');
      src: url('font/stone-sans/StoneSansIIITCW01-Lt.eot?#iefix') format('embedded-opentype'),
      url(${LtWoff}) format('woff'),
      url(${Ltttf}) format('truetype');
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
      font-family: 'StoneSansIIITCW01-SmBd';
      src: url('font/stone-sans/StoneSansIIITCW01-SmBd.eot');
      src: url('font/stone-sans/StoneSansIIITCW01-SmBd.eot?#iefix') format('embedded-opentype'),
      url(${SmBdWoff}) format('woff'),
      url(${SmBdttf}) format('truetype');
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
      font-family: 'Sentinel';
      src: url('font/sentinel/Sentinel-BoldItalic.eot');
      src: url('font/sentinel/Sentinel-BoldItalic.eot?#iefix') format('embedded-opentype'),
      url(${SBIWoff}) format('woff'),
      url(${SBIWoff}) format('truetype');
      font-weight: bold;
      font-style: italic;
  }
  @font-face {
      font-family: 'StoneSansIIITCW01-Bk';
      src: url('font/stone-sans/StoneSansIIITCW01-Bk.eot?#iefix') format('embedded-opentype'),
      url(${BkWoff}) format('woff'),
      url(${Bkttf})  format('truetype'),
      url('font/stone-sans/StoneSansIIITCW01-Bk.svg#StoneSansIIITCW01-Bk') format('svg');
      font-weight: normal;
      font-style: normal;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'StoneSansIIITCW01-Md';
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
`;
