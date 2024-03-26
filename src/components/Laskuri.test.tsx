import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Laskuri from "./Laskuri"
import { InputTypes } from "../pages/Tab1"

test("renders Laskuri component", () => {
  const laskuri = {
    laskuriId: "1",
    fields: [
      { name: "field1", currentValue: 10, defaultValue: 0, type: InputTypes.NORMAL },
      { name: "field2", currentValue: 20, defaultValue: 0, type: InputTypes.NORMAL },
    ],
    variables: [
      { name: "a", currentValue: 10, defaultValue: 0 },
    ],
    formula: "field1 + field2 + 5",
    result: 0,
  }

  const { getByText, getByLabelText } = render(
    <Laskuri
      laskuri={laskuri}
      onLaskuriChange={() => {
        return null
      }}
    />
  )

  // Check if the component renders the laskuriId
  expect(getByText("Laskuri 1")).toBeInTheDocument()

  // Check if the component renders the formula
  // expect(getByText('field1 + field2 + 5')).toBeInTheDocument();

  // Check if the component renders the fields
  const field1Input = getByLabelText("field1", { selector: "input" }) as HTMLInputElement;
  const field2Input = getByLabelText("field2", { selector: "input" }) as HTMLInputElement;
  expect(field1Input.value).toBe("10")
  expect(field2Input.value).toBe("20")

  // Check if the component renders the result
  expect(getByText("Tulos: 35")).toBeInTheDocument()
})

test("updates field value and result on input change", () => {
  const laskuri = {
    laskuriId: "1",
    fields: [
      { name: "field1", currentValue: 10, defaultValue: 0, type: InputTypes.NORMAL },
      { name: "field2", currentValue: 20, defaultValue: 0, type: InputTypes.NORMAL },
    ],
    variables: [
      { name: "a", currentValue: 10, defaultValue: 0 },
    ],
    formula: "field1 + field2",
    result: 0,
  }

  let updatedResult = 0
  const handleLaskuriChange = (laskuriId: string, result: number) => {
    updatedResult = result
  }

  const { getByLabelText, getByText } = render(
    <Laskuri laskuri={laskuri} onLaskuriChange={handleLaskuriChange} />
  )

  // Update field1 value
  const field1Input = getByLabelText("field1", { selector: "input" }) as HTMLInputElement;
  fireEvent.change(field1Input, { target: { value: "15" } })

  // Check if the field1 value is updated
  expect(field1Input.value).toBe("15")

  // Check if the result is updated
  expect(getByText("Tulos: 35")).toBeInTheDocument()

  // Check if the onLaskuriChange callback is called with the updated result
  expect(updatedResult).toBe(35)
})
