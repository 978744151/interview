/// <reference types="vite/client" />
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// import * as $ from 'jquery'



declare global {
  interface Window {
    $message: any
  }
}

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}
declare namespace NodeJS {
  type Timer = any;
  type Timeout = any;
}


declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.scss'
declare module '*.js'
declare module '*.vue'
declare module '*.jsx'
declare module '*.tsx'
declare module '*.ts'
declare module '**/*.ts'
declare module '**/**/*.ts'
