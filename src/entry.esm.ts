import { App, Plugin } from 'vue';

import Tree from '@/tree-component.vue';

type InstallableComponent = typeof Tree & { install: Exclude<Plugin['install'], undefined> };

export default ((): InstallableComponent => {
  const installable = Tree as unknown as InstallableComponent;
  installable.install = (app: App) => {
    app.component('Vue3TreeVue', installable);
  };
  return installable;
})();
