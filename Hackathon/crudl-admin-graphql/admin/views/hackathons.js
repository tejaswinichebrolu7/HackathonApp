import { formatDate, formatStringToDate, select } from '../utils'
import React from 'react'

import { createResourceConnector } from '../connectors'
import continuousPagination from '../connectors/middleware/continuousPagination'

const entryFields = '_id, id, name, status, ' +
                    'startDate, endDate,summary ' +
                    'emailAddress'
const hackathons = createResourceConnector('hackathons', entryFields).use(continuousPagination(20)) // page limit 20

//-------------------------------------------------------------------
var listView = {
    path: 'hackathons',
    title: 'Hackathon entries',
    actions: {
        list: function (req) {
            return hackathons.read(req)           
        }
    },
    normalize: (list) => list.map(item => {
        item.startDate = formatStringToDate(item.startDate)
        return item
    })
}

listView.fields = [
    /*{
        name: '_id',
        label: 'ID',
        hidden: true,
    },*/
    {
        name: 'name',
        label: 'Name',
        sortable: true,
    },
    {
        name: 'status',
        label: 'Status',
        sortable: true,
    },
    {
        name: 'emailAddress',
        label: 'Email address',
        main: true,
        sortable: true,
    },
    {
        name: 'startDate',
        label: 'Start Date',
        sortable: true,
        sorted: 'descending',
        sortpriority: '2',
    },
    {
        name: 'endDate',
        label: 'End Date',
        sortable: true,
        sorted: 'descending',
        sortpriority: '2',
    },
]

var fieldsets = [
    {
        fields: [
            {
                name: 'name',
                label: 'Hackathon Name',
                field: 'Text',
                required: true,
            },
            {
                name: 'status',
                label: 'Status',
                field: 'Select',
                required: true,
                initialValue: 'Draft',
                /* set options manually */
                options: [
                    {value: 'Draft', label: 'Draft'},
                    {value: 'Online', label: 'Online'}
                ],
            },
            {
                name: 'emailAddress',
                label: 'Boardcast Emails',
                field: 'Text'
            }
            // {
            //     name: 'Section',
            //     getValue: select('section._id'),
            //     label: 'Section',
            //     field: 'Select',
            //     /* we set required to false, although this field is actually
            //     required with the API. */
            //     required: false,
            //     lazy: () => sectionOptions.read(crudl.req()).then(res => ({
            //         helpText: 'Select a section',
            //         ...res,
            //     }))
            // },
            // {
            //     name: 'category',
            //     getValue: select('category._id'),
            //     label: 'Category',
            //     field: 'Select',
            //     required: false,
            //     helpText: 'Select a category',
            //     onChange: listView.filters.fields[2].onChange,
            //     lazy: () => categoryOptions.read(crudl.req()),
            // },
        ],
    },
    {
        title: 'Content',
        expanded: true,
        fields: [
            {
                name: 'startDate',
                label: 'Start Date',
                field: 'Date',
                required: true,
                initialValue: () => formatDate(new Date()),
                formatDate: formatDate
            },
            {
                name: 'endDate',
                label: 'End Date',
                field: 'Date',
                required: true,
                initialValue: () => formatDate(new Date()),
                formatDate: formatDate
            }
            
            // {
            //     name: 'summary',
            //     label: 'Summary',
            //     field: 'Textarea',
            //     validate: (value, allValues) => {
            //         if (!value && allValues.status == 'Online') {
            //             return 'The summary is required with status "Online".'
            //         }
            //     }
            // },
            // {
            //     name: 'body',
            //     label: 'Body',
            //     field: 'Textarea',
            //     validate: (value, allValues) => {
            //         if (!value && allValues.status == 'Online') {
            //             return 'The summary is required with status "Online".'
            //         }
            //     }
            // },
            // {
            //     name: 'tags',
            //     getValue: select('tags[*]._id'),
            //     label: 'Tags',
            //     field: 'AutocompleteMultiple',
            //     required: false,
            //     showAll: false,
            //     helpText: 'Select a tag',
            //     actions: {
            //         search: (req) => {
            //             return tagsOptions.read(req.filter('name', req.data.query.toLowerCase()))
            //             .then(({ options }) => options)
            //         },
            //         select: (req) => Promise.all(req.data.selection.map(
            //             item => tags(item.value).read(crudl.req()).then(
            //                 tag => ({ value: tag._id, label: tag.name, })
            //             )
            //         )),
            //     },
            // }
        ]
    },
    {
        fields: [
            {
                name: 'summary',
                label: 'Summary',
                field: 'Textarea'
            }
        ]
    }
       
]

var changeView = {
    path: 'hackathons/:_id',
    title: 'Edit Hackathon',
    fieldsets: fieldsets,
    actions: {
        get: function (req) {  return hackathons(crudl.path._id).read(req) },
        delete: function (req) { return hackathons(crudl.path._id).delete(req) },
        save: function (req) { return hackathons(crudl.path._id).update(req) },
    },
    normalize: (get) => {
        get.startDate = new Date(get.startDate).toJSON()
        get.endDate = new Date(get.endDate).toJSON()
        return get;
    },
    denormalize: function (data) {
        return data
    }, 
}

var addView = {
    path: 'hackathons/new',
    title: 'New Hackathon',
    fieldsets: fieldsets,
    validate: function (values) {
        if ((!values.name || values.status == "")) {
            return { _error: 'Either `Name` or `Status` is required.' }
        }
    },
    actions: {
        add: function (req) { return hackathons.create(req);  },
    }
}


//-------------------------------------------------------------------
module.exports = {
    listView,
    addView,
    changeView,
}
