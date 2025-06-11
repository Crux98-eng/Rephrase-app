import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const FriendRequest = ({ name, isRequest, profile }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.profile}>
                    <Image
                        source={profile ? { uri: profile } : require('../assets/icons/profile.png')}
                        style={{ width: 60, height: 60,  }}
                    />
                </View>
                <Text style={styles.names} >{name}</Text>
            </TouchableOpacity>
            {isRequest && (
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: 'blue' }}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: 'blue' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!isRequest && (
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: 'blue' }}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: 'blue' }}>Remove</Text>
                    </TouchableOpacity>

                </View>

            )
            }
        </View>
    )
}

export default FriendRequest

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#E6E6E6',
        width: '100%',
        height: 120,
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,

    },
    names: {
        position: 'absolute',
        marginLeft: 130,
        fontSize: 24,
        color: 'black',

    },
    btn: {
        width: 300,
        height: 50,
        zIndex: 1,
        display: 'flex',
        marginLeft: 130,
        flexDirection: 'row',
        gap: 20,
        position: 'absolute',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        backgroundColor: '#E6E6E6',
        paddingHorizontal: 50,
        paddingVertical: 8,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.5,
        elevation: 5,


    },
    profile: {

        backgroundColor: '#8686DB',
        width: 80,
        height: 80,
        borderRadius: '50%',
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',


    },

})