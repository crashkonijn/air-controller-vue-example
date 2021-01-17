export default {
    methods: {
        parsePlanet(raw) {
            return this.loadProto(
                "messages/planet.proto",
                "Platform.AirConsole.ProtoMessages.Planet",
                raw
            )
        },
        parseGalaxy(raw) {
            return this.loadProto(
                "messages/planet.proto",
                "Platform.AirConsole.ProtoMessages.Galaxy",
                raw
            )
        },
        parseRoundStats(raw) {
            return this.loadProto(
                "messages/planet.proto",
                "Platform.AirConsole.ProtoMessages.RoundStats",
                raw
            )
        },
        parseAction(raw) {
            return this.loadProto(
                "messages/planet.proto",
                "Platform.AirConsole.ProtoMessages.Actions",
                raw
            )
        },
        loadProto(file, path, raw) {
            return new Promise((resolve, reject) => {
                if (raw === null || raw === undefined) {
                    reject();
                    return;
                }
                
                protobuf.load("messages/planet.proto", function(err, root) {
                    if (err) {
                        reject(err)
                        return;
                    }

                    // Obtain a message type
                    var ProtoMessage = root.lookupType(path);
                    
                    let buffer = protobuf.util.newBuffer(protobuf.util.base64.length(raw));
                    protobuf.util.base64.decode(raw, buffer, 0);
                    
                    // Decode an Uint8Array (browser) or Buffer (node) to a message
                    resolve(ProtoMessage.decode(buffer));
                })
            })
        }
    }
}