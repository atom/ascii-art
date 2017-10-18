const {CompositeDisposable} = require('atom')

module.exports = {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable()
    return this.subscriptions.add(atom.commands.add('atom-workspace',
      {'ascii-art:convert': () => this.convert()})
    )
  },

  deactivate () {
    return this.subscriptions.dispose()
  },

  convert () {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      const selection = editor.getSelectedText()

      const figlet = require('figlet')
      const font = 'o8'
      return figlet(selection, {font}, function (error, art) {
        if (error) {
          return console.error(error)
        } else {
          return editor.insertText(`\n${art}\n`)
        }
      })
    }
  }
}
