<template>
    <div id="app">
        <air-controller page="loading">
            <air-page name="loading">
                <h1>Loading..</h1>
            </air-page>
            <air-page name="claim">
                <air-button mode="down" name="claim" anchor="center-center"></air-button>
            </air-page>
            <air-page name="full">
                <h1>All players are claimed</h1>
            </air-page>
            <air-page name="menu">
                <air-button mode="down" id="buttons" name="menu" value="0"></air-button>
                <air-button mode="down" id="swipe" name="menu" value="1"></air-button>
                <air-button mode="down" id="pan" name="menu" value="2"></air-button>
                <air-button mode="down" id="motion" name="menu" value="3"></air-button>
                <air-button mode="down" id="custom-data" name="menu" value="4" disabled></air-button>
                <air-button mode="down" id="axis" name="menu" value="5"></air-button>
                <air-button mode="down" id="profile" name="menu" value="6"></air-button>
                <air-button mode="down" id="joystick" name="menu" value="7"></air-button>
                <air-button mode="down" id="back" name="unclaim"></air-button>
            </air-page>
            <air-page name="buttons">
                <air-button mode="down" name="tap"></air-button>
                <air-button mode="hold" name="hold"></air-button>
                <div class="number-parent">
                    <air-button mode="down" name="number" value="1">1</air-button>
                    <air-button mode="down" name="number" value="2">2</air-button>
                    <air-button mode="down" name="number" value="3">3</air-button>
                </div>
                <air-button mode="down" name="hero" premium-only></air-button>
                <air-button mode="down" name="back"></air-button>
            </air-page>
            <air-page name="swipe">
                <air-swipe name="swipe">
                    <h1>Swipe on the screen</h1>
                </air-swipe>
                <air-button mode="down" name="back"></air-button>
            </air-page>
            <air-page name="pan">
                <air-pan name="pan">
                    <h1>Drag on the screen</h1>
                </air-pan>
                <air-button mode="down" name="back"></air-button>
            </air-page>
            <air-page name="motion">
                <air-gyroscope name="motion">
                    <h1>Rotate the phone</h1>
                </air-gyroscope>
                <air-button mode="down" name="back"></air-button>
            </air-page>
            <air-page name="profile">
                <air-profile-image name="profile" anchor="center-center"></air-profile-image>
                <air-button mode="down" name="back"></air-button>
            </air-page>
            <air-page name="custom-data">
                <custom-data></custom-data>
                <air-button mode="down" name="back"></air-button>
            </air-page>
            <air-page name="axis">
                <air-position anchor="center-center">
                    <air-axis name="move" anchor="center-left" mode="left"></air-axis>
                    <air-axis name="move" anchor="top-left" mode="up-left"></air-axis>
                    <air-axis name="move" anchor="top-center" mode="up"></air-axis>
                    <air-axis name="move" anchor="top-right" mode="up-right"></air-axis>
                    <air-axis name="move" anchor="center-right" mode="right"></air-axis>
                    <air-axis name="move" anchor="bottom-left" mode="down-left"></air-axis>
                    <air-axis name="move" anchor="bottom-center" mode="down"></air-axis>
                    <air-axis name="move" anchor="bottom-right" mode="down-right"></air-axis>
                </air-position>
                <air-button mode="down" name="back"></air-button>
            </air-page>
            <air-page name="joystick">
                <air-joystick name="move"></air-joystick>
                <air-button mode="down" name="back"></air-button>
            </air-page>
        </air-controller>
    </div>
</template>

<script>
    import CustomData from "./components/CustomData";

    export default {
        name: 'app',
        components: {
            CustomData,
        },
    }
</script>