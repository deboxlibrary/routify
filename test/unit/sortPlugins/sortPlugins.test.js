import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { sortPlugins } from '../../../lib/utils.js'

const test = suite('sort plugins')

test('sortPlugins can sort plugins', async () => {
    const plugins = [
        { name: 'third', after: 'second' },
        { name: 'second' },
        { name: 'first', before: 'second' },
    ]

    const res = sortPlugins(plugins)
    assert.snapshot(res.map(p => p.name).join(','), 'first,second,third')
})

test('sortPlugins preserves order when possible', async () => {
    const plugins = [
        { name: 'second', after: 'first' },
        { name: 'first' },
        { name: 'fourth' },
        { name: 'fifth' },
        { name: 'third', before: 'fourth' },
        { name: 'sixth' },
    ]

    const res = sortPlugins(plugins)
    assert.snapshot(res.map(p => p.name).join(','), 'first,second,third,fourth,fifth,sixth')
})

test('sortPlugins reports loops', async () => {
    const plugins = [
        { name: 'third', after: 'second' },
        { name: 'second' },
        { name: 'first', before: 'second' },
        { name: 'impossible', before: 'second', after: 'third' },
    ]

    assert.throws(() => sortPlugins(plugins))
})

test.run()