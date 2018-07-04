import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt
} from 'graphql'
import { connectionDefinitions, } from 'graphql-relay'

let HackathonType = new GraphQLObjectType({
    name: 'Hackathon',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLString
        },
        endDate: {
            type: GraphQLString
        },
        emailAddress: {
            type: GraphQLString
        },
        summary: {
            type: GraphQLString
        }
    })
})

let HackathonInputType = new GraphQLInputObjectType({
    name: 'HackathonInput',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        clientMutationId: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLString
        },
        endDate: {
            type: GraphQLString
        },
        emailAddress: {
            type: GraphQLString
        },
        summary: {
            type: GraphQLString
        },
    })
})

let HackathonResultType = new GraphQLObjectType({
    name: 'hackathonResult',
    fields: () => ({
        errors: {
            type: new GraphQLList(GraphQLString),
        },
        hackathon: {
            type: HackathonType
        }
    })
});

let HackathonDeleteType = new GraphQLObjectType({
    name: 'HackathonDelete',
    fields: () => ({
        deleted: {
            type: GraphQLBoolean
        },
        hackathon: {
            type: HackathonType
        }
    })
});

const { connectionType: HackathonListConnection, edgeType: HackathonListEdge } =
    connectionDefinitions({
        name: 'HackathonList',
        nodeType: HackathonType,
        connectionFields: () => ({
            filteredCount: {
                type: GraphQLInt,
                resolve: (connection) => connection.filteredCount,
            },
            totalCount: {
                type: GraphQLInt,
                resolve: (connection) => connection.totalCount,
            }
        })
    })

module.exports = {
    HackathonListConnection: HackathonListConnection,
    HackathonType: HackathonType,
    HackathonInputType: HackathonInputType,
    HackathonResultType: HackathonResultType,
    HackathonDeleteType: HackathonDeleteType
}
