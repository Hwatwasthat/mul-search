'use client'
import {Suspense, useState} from 'react'
import { AddUnitCallback } from './unitListApi';
import SearchForm from './searchForm';
import ResultContainer from './resultContainer';
import { Faction } from './data';
import { IUnit } from './unitLine';
import dynamic from "next/dynamic";

function Loading({name}:{name:string}) {
    return (<div>{name} loading...</div>)
}

const ListBuilder = dynamic(
    () => {
        return import('./listContainer')
    },
    {
        ssr: false
    }
)

export default function CsrPage({factions}: {factions:Faction[]}) {
    let [onAdd, setOnAdd] = useState<AddUnitCallback>((u) => {})

    function onAddProxy(unit: IUnit) {

        onAdd(unit)
    }

    return <>
        <div className="bg-inherit">
            <Suspense fallback={<Loading name="Search Form"/>}>
                <SearchForm factions={factions} />
            </Suspense>
            <Suspense fallback={<Loading name="Search Results"/>}>
                <ResultContainer onAdd={onAddProxy}/>
            </Suspense>
            <ListBuilder onCreate={ cb => onAdd = cb }/>
        </div>
    </>

}