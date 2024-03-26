import React, { useEffect, useState } from "react"
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react"
import "./Tab1.css"
import Laskuri from "../components/Laskuri"

export enum InputTypes {
  NORMAL = "normal",
  SLIDER = "slider"
}

export interface ILaskuri {
  laskuriId: string
  fields: {
    name: string
    type: InputTypes
    defaultValue: number
    currentValue?: number
  }[]
  variables: {
    name: string
    defaultValue: number
    currentValue?: number
  }[]
  formula: string
  result: number
}

const Tab1: React.FC = () => {
  // compined laskuri results
  const [laskurit, setLaskurit] = useState<ILaskuri[]>([])

  const [variables, setVariables] = useState<
    { name: string; defaultValue: number; currentValue: number }[]
  >([])

  // initialising the laskurit array
  useEffect(() => {
    setLaskurit(
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((laskuriId) => ({
        laskuriId,
        type: "normal",
        formula:
          laskuriId !== "6"
            ? `(x + y + ${laskuriId})`
            : `(x + y + ${laskuriId}) + result_1`,
        result: 0,
        fields: [
          { name: "x", defaultValue: 0, type: laskuriId !== "2" ? InputTypes.NORMAL : InputTypes.SLIDER },
          { name: "y", defaultValue: 0, type: InputTypes.NORMAL},
        ],
        variables: variables, // [{ name: "a", defaultValue: 15 }],
      }))
    )
  }, [])

  const handleLaskuriChange = (laskuriId: string, result: number) => {
    // updating the result of the laskuri with the given laskuriId
    setLaskurit((prevLaskurit) =>
      prevLaskurit.map((laskuri) =>
        laskuri.laskuriId === laskuriId ? { ...laskuri, result } : laskuri
      )
    )
  }

  useEffect(() => {
    // convert results to variable
    const newVariables: {
      name: string
      defaultValue: number
      currentValue: number
    }[] = []
    for (const laskuri of laskurit) {
      newVariables.push({
        name: `result_${laskuri.laskuriId}`,
        currentValue: laskuri.result,
        defaultValue: 0,
      })
    }

    setVariables(newVariables)
  }, [laskurit])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Laskurit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              {laskurit.map((laskuri) => (
                <Laskuri
                  key={laskuri.laskuriId}
                  laskuri={laskuri}
                  onLaskuriChange={handleLaskuriChange}
                />
              ))}
            </IonCol>
            <IonCol>
              <div>Yhteensä</div>
              <div>{laskurit.reduce((acc, { result }) => acc + result, 0)}</div>

              <div>Summalaskuri</div>
              <Laskuri
                key="jeejee"
                laskuri={{
                  laskuriId: "total",
                  formula: "result_3 + result_2",
                  result: 0,
                  fields: [],
                  variables: variables,
                }}
                onLaskuriChange={() => console.log("total muutos")}
              />
            </IonCol>
            <IonCol>
              <IonList>
                <IonListHeader>Muuttujat</IonListHeader>
              </IonList>
              {variables.map((variable) => (
                <IonItem key={variable.name}>
                  {variable.name}: {variable.currentValue}
                </IonItem>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Tab1
