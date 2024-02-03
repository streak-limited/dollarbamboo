// import { Command, Extension } from 'tiptap'
import { Extension } from '@tiptap/react'

export const SlashCommand = Extension.create({
  name: 'customExtension',

  addKeyboardShortcuts() {
    return {
      // ↓ your new keyboard shortcut
      '/': () => this.editor.commands.toggleBulletList(),
    }
  },
  // Your code goes here.
})
// class SlashCommand extends Extension {
//   get name() {
//     return 'slash_command'
//   }

//   commands() {
//     return {
//       insertSlashCommand: () => (state, dispatch) => {
//         // Handle the "/" command here
//         // You can display a dropdown menu or any other UI element to choose between text, image, and table
//         // For simplicity, we'll just insert a text node when "/" is typed
//         const node = state.schema.text('/')
//         dispatch(state.tr.replaceSelectionWith(node))
//         return true
//       },
//     }
//   }

//   keys() {
//     return {
//       '/': toggleBlockType(this.type),
//     }
//   }
// }
