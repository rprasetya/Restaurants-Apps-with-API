import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import $ from 'jquery';
import axios, { all } from 'axios';
import { async } from 'regenerator-runtime';
import {
    createStore,
    keys,
  } from 'idb-keyval';