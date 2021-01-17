<template>
    <div id="app">
        <air-controller page="gameplayResult">
            <air-page name="loading">
                <loading-page></loading-page>
            </air-page>
            <air-page name="menu">
                <menu-page></menu-page>
            </air-page>
            <air-page name="settings">
                <settings-page></settings-page>
            </air-page>
            <air-page name="gameplay">
                <gameplay-page></gameplay-page>
            </air-page>
            <air-page name="gameplayViewing">
                <gameplay-viewing-page></gameplay-viewing-page>
            </air-page>
            <air-page name="gameplayResult">
                <gameplay-result-page></gameplay-result-page>
            </air-page>
            <air-page name="gameOver">
                <gameover-page></gameover-page>
            </air-page>
        </air-controller>
    </div>
</template>

<script>
    import LoadingPage from "./pages/loading-page";
    import GameplayPage from "./pages/gameplay-page";
    import MenuPage from "./pages/menu-page";
    import SettingsPage from "./pages/settings-page";
    import GameplayViewingPage from "./pages/gameplay-viewing-page";
    import GameplayResultPage from "./pages/gameplay-result-page";
    import GameoverPage from "./pages/gameover-page";

    export default {
        name: 'app',
        components: {
            GameoverPage,
            GameplayViewingPage,
            GameplayResultPage,
            SettingsPage,
            MenuPage,
            GameplayPage,
            LoadingPage,
        },
    }
</script>