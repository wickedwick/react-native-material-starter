/* eslint-disable @typescript-eslint/ban-types */
import { postData } from "../services/fetch";

const baseUrl = 'https://api.clarifai.com';

export function predictConcepts(base64: string, callback: Function, errorCallback: Function, loadingCallback: Function): void {
  const endpoint = `${baseUrl}/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs`;
  loadingCallback(true);
  postData(endpoint, callback, errorCallback, loadingCallback, createImageDataInputs(base64));
}

export function celebrityDetector(base64: string, callback: Function, errorCallback: Function, loadingCallback: Function): void {
  const endpoint = `${baseUrl}/v2/models/cfbb105cb8f54907bb8d553d68d9fe20/outputs`;
  loadingCallback(true);
  postData(endpoint, callback, errorCallback, loadingCallback, createImageDataInputs(base64));
}

function createImageDataInputs(base64: string) {
  return {
    inputs: [
      {
        data: {
          image: {
            base64: base64
          }
        }
      }
    ]
  };
}