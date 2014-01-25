module.exports =
  activate: ->
    atom.workspaceView.command "ascii-art:convert", => @convert()

  convert: ->
    # This assumes the active pane item is an editor
    selection = atom.workspace.activePaneItem.getSelection()

    figlet = require 'figlet'
    figlet selection.getText(), {font: "Larry 3D 2"}, (error, asciiArt) ->
      if error
        console.error(error)
      else
        selection.insertText("\n" + asciiArt + "\n")
