import sqlite3 from "sqlite3"

// ファイルに対応した、ただ１つのインスタンス
let database

export class DBCommon {
  static init() {
    database = new sqlite3.Database("photo.db")
  }
  static get() {
    return database
  }
}