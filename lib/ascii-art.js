const {CompositeDisposable} = require('atom')

module.exports = {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'ascii-art:convert': () => this.convert()})
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  convert () {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      const selection = editor.getSelectedText()

      const figlet = require('figlet')
      const font = 'o8'
      figlet(selection, {font}, function (error, art) {
        if (error) {
          console.error(error)
        } else {
          editor.insertText(`\n${art}\n`)
        }
      })
    }
  }
}
