import { parser } from "mathjs"
import { useEffect, useState } from "react"

const useCalculator = ({
    laskuriId,
    fields,
    variables,
    formula,
    onLaskuriChange,
}: UseCalculator) => {
    const [result, setResult] = useState(0)

    // field names and default values
    const [inputFields, setInputFields] = useState(fields)

    // calculate the result
    useEffect(() => {

        const p = parser()

        // create variables for the input fields
        for (const inputField of inputFields) {
            p.set(inputField.name, inputField.currentValue || inputField.defaultValue)
        }

        // create variables for input variables
        for(const inputVariable of variables){
            p.set(inputVariable.name, inputVariable.currentValue || inputVariable.defaultValue)
        }

        // evaluate the formula
        const res = p.evaluate(formula)

        setResult(res)
    }, [inputFields, variables, formula])

    useEffect(() => {
        onLaskuriChange(laskuriId, result)
    }, [result])

    const onFieldChange = (name: string, value: number) => {
        setInputFields((prevInputFields) =>
            prevInputFields.map((inputField) =>
                inputField.name === name ? { ...inputField, currentValue: value } : inputField
            )
        )
    }

    return {
        result,
        inputFields,
        onFieldChange,
    }
}

export default useCalculator

interface UseCalculator {
    laskuriId: string
    fields: {
        name: string
        defaultValue: number
        currentValue?: number | undefined
    }[]
    variables: {
        name: string
        defaultValue: number
        currentValue?: number | undefined
    }[]
    formula: string
    onLaskuriChange: (laskuriId: string, result: number) => void
}