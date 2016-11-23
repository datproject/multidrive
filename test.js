var raf = require('random-access-file')
var rimraf = require('rimraf')
var test = require('tape')
var uuid = require('uuid')
var path = require('path')

var multidrive = require('./')

test('drive = multidrive', function (t) {
  t.test('should assert input types', function (t) {
    t.plan(3)
    t.throws(multidrive, /name/)
    t.throws(multidrive.bind(null, 'hi'), /function/)
    t.throws(multidrive.bind(null, 'hi', 'hi', 'hi'), /object/)
  })
})

test('drive.createArchive', function (t) {
  t.test('should assert input types', function (t) {
    t.plan(3)
    var name = uuid()
    multidrive(name, function (err, drive) {
      t.ifError(err, 'no err')
      t.throws(drive.createArchive, /directory/)
      t.throws(drive.createArchive.bind(drive, '/foo/bar', 'nope'), /function/)
      rimraf.sync(path.join(process.env.HOME, '.level', name))
    })
  })

  t.test('should create an archive', function (t) {
    t.plan(2)
    var name = uuid()

    var opts = {
      file: function (name, dir) { return raf(path.join(dir, name)) }
    }
    multidrive(name, opts, function (err, drive) {
      t.ifError(err, 'no err')

      var archiveDir = path.join('/tmp', uuid())
      drive.createArchive(archiveDir, function (err, drive) {
        t.ifError(err, 'no err')
        rimraf.sync(path.join(process.env.HOME, '.level', name))
        rimraf.sync(archiveDir)
      })
    })
  })
})

test('drive.removeDrive', function (t) {
})

test('drive.list', function (t) {
})
