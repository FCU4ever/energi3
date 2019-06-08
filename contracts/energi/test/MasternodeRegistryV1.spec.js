// Copyright 2019 The Energi Core Authors
// This file is part of Energi Core.
//
// Energi Core is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Energi Core is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Energi Core. If not, see <http://www.gnu.org/licenses/>.

// Energi Governance system is the fundamental part of Energi Core.

'use strict';

const MockProxy = artifacts.require('MockProxy');
const MockContract = artifacts.require('MockContract');
const MasternodeRegistryV1 = artifacts.require('MasternodeRegistryV1');
const IMasternodeRegistry = artifacts.require('IMasternodeRegistry');
const StorageMasternodeRegistryV1 = artifacts.require('StorageMasternodeRegistryV1');

const common = require('./common');

contract("MasternodeRegistryV1", async accounts => {
    const s = {
        artifacts,
        accounts,
        assert,
        it,
        web3,
    };

    before(async () => {
        s.orig = await MasternodeRegistryV1.deployed();
        s.proxy = await MockProxy.at(await s.orig.proxy());
        s.fake = await MockContract.new(s.proxy.address);
        s.proxy_abi = await MasternodeRegistryV1.at(s.proxy.address);
        s.token_abi = await IMasternodeRegistry.at(s.proxy.address);
        await s.proxy.setImpl(s.orig.address);
        s.storage = await StorageMasternodeRegistryV1.at(await s.proxy_abi.v1storage());
        Object.freeze(s);
    });

    describe('common pre', () => common.govPreTests(s) );

    //---
    describe('Primary', () => {
    });

    //---
    describe('common post', () => common.govPostTests(s) );
});
