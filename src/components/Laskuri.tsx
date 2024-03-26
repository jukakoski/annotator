import React from "react"
import Tex2SVG from "react-hook-mathjax"
import { ILaskuri, InputTypes } from "../pages/Tab1"
import useCalculator from "../hooks/useCalculator"
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonPopover,
  IonRange,
  IonRow,
} from "@ionic/react"
import styles from "./Laskuri.module.css"
import { informationCircle } from "ionicons/icons"

const Laskuri: React.FC<LaskuriProps> = ({ laskuri, onLaskuriChange }) => {
  const { result, inputFields, onFieldChange, status, errorMessage } =
    useCalculator({
      laskuriId: laskuri.laskuriId,
      fields: laskuri.fields,
      variables: laskuri.variables,
      formula: laskuri.formula,
      onLaskuriChange: onLaskuriChange,
    })

  return (
    <IonCard
      className={styles["has-card-footer"]}
      style={{
        backgroundColor: status === "error" ? "red" : undefined,
        color: status === "error" ? "white" : undefined,
      }}
    >
      <IonCardHeader>
        <IonCardTitle>{`Laskuri ${laskuri.laskuriId}`}</IonCardTitle>
        <IonCardSubtitle>
          <Tex2SVG display="inline" latex={laskuri.formula} />
        </IonCardSubtitle>
        <IonButtons>
          <IonButton id={`info-button-${laskuri.laskuriId}`} slot="end" className={styles["info-button"]} fill="clear">
            <IonIcon slot="icon-only" icon={informationCircle}></IonIcon>
          </IonButton>
        </IonButtons>

        <IonPopover trigger={`info-button-${laskuri.laskuriId}`}>
          <IonContent className="ion-padding">
            {JSON.stringify(inputFields)}
          </IonContent>
        </IonPopover>
      </IonCardHeader>

      <IonCardContent>
        {inputFields.map((inputField) =>
          inputField.type === InputTypes.NORMAL ? (
            <IonInput
              key={inputField.name}
              label={inputField.name}
              labelPlacement="start"
              aria-label={inputField.name}
              fill="outline"
              type="number"
              inputmode="numeric"
              value={inputField.currentValue || inputField.defaultValue}
              onIonChange={(e) =>
                onFieldChange(
                  inputField.name,
                  e.detail.value ? parseInt(e.detail.value) : 0
                )
              }
            />
          ) : (
            <IonRange
              key={inputField.name}
              label={inputField.name}
              pin
              labelPlacement="start"
              aria-label={inputField.name}
              value={inputField.currentValue || inputField.defaultValue}
              onIonChange={(e) =>
                onFieldChange(
                  inputField.name,
                  typeof e.detail.value === "number" ? e.detail.value : 0
                )
              }
            ></IonRange>
          )
        )}
      </IonCardContent>

      <IonRow className={styles["card-footer"]}>
        <IonCol>
          <div>{`Tulos: ${result}`}</div>
          {status === "error" && <div>Virhe: {errorMessage}</div>}
        </IonCol>
      </IonRow>
    </IonCard>
  )
}

export default Laskuri

interface LaskuriProps {
  laskuri: ILaskuri
  onLaskuriChange: (laskuriId: string, result: number) => void
}
