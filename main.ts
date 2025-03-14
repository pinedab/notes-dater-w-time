import { Plugin, moment, FileView } from 'obsidian';

export default class NotesDaterPlugin extends Plugin {
  async onload() {

    const statusBarCreatedOn = this.addStatusBarItem();
    const statusBarUpdatedOn = this.addStatusBarItem();

    // Set initial values
    this.setStatusBarDateValues(statusBarCreatedOn, statusBarUpdatedOn);


    this.registerEvent(
      this.app.workspace.on('active-leaf-change', async () => {
        this.setStatusBarDateValues(statusBarCreatedOn, statusBarUpdatedOn);
      })
    );
  }

  async onunload() {
  }

  setStatusBarDateValues(statusBarCreatedOn, statusBarUpdatedOn) {
    const activeView = this.app.workspace.getActiveViewOfType(FileView);
    const activeFile = this.app.workspace.getActiveFile();
    if (activeView && activeFile) {
      const stats = activeFile?.stat
      const createdDate = moment(stats.ctime).format('ddd, MMM DD, YYYY h:mm:ss A');
      const updatedDate = moment(stats.mtime).format('ddd, MMM DD, YYYY h:mm:ss A');
      statusBarCreatedOn.setText(`Created on: ${createdDate}`);
      statusBarUpdatedOn.setText(`Updated on: ${updatedDate}`);
    }
  }

}
