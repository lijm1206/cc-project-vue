import { generate } from '@ant-design/colors';
import { viteThemePlugin } from 'vite-plugin-theme';

const colors = generate('#1890ff', {
    theme: 'default'
});

export function themeReplacerPlugin() {
    const plugin = viteThemePlugin({
        /*resolveSelector: (selector) => {
            switch (selector) {
                case ".ant-calendar-today .ant-calendar-date":
                    return (
                        ":not(.ant-calendar-selected-date):not(.ant-calendar-selected-day)" +
                        selector
                    );
                case ".ant-btn:focus,.ant-btn:hover":
                    return ".ant-btn:focus:not(.ant-btn-primary):not(.ant-btn-danger),.ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger)";
                case ".ant-btn.active,.ant-btn:active":
                    return ".ant-btn.active:not(.ant-btn-primary):not(.ant-btn-danger),.ant-btn:active:not(.ant-btn-primary):not(.ant-btn-danger)";
                case ".ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon":
                case ".ant-steps-item-process .ant-steps-item-icon>.ant-steps-icon":
                    return ":not(.ant-steps-item-process)" + selector;
                case ".ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-submenu-selected,.ant-menu-horizontal>.ant-menu-submenu:hover":
                case ".ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal > .ant-menu-submenu-selected,.ant-menu-horizontal > .ant-menu-submenu:hover":
                    return ".ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover";
                case ".ant-menu-horizontal > .ant-menu-item-selected > a":
                case ".ant-menu-horizontal>.ant-menu-item-selected>a":
                    return ".ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark) > .ant-menu-item-selected > a";
                case ".ant-menu-horizontal > .ant-menu-item > a:hover":
                case ".ant-menu-horizontal>.ant-menu-item>a:hover":
                    return ".ant-menu-horizontal:not(ant-menu-light):not(.ant-menu-dark) > .ant-menu-item > a:hover";
                default:
                    return selector;
            }
        },*/
        colorVariables: [...colors],
    });

    return plugin
}
