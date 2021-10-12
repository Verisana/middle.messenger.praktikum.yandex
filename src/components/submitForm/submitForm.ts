import styles from "./submitForm.css"
import { convertStylesToStrings } from "../../utils/utils"
import { ISubmitFormParams } from "./types"
import { Block, Props } from "../block"

export class SubmitForm extends Block {
    constructor(params: ISubmitFormParams) {
        const { props, settings = {} } = params
        settings.isNoBorder =
            settings.isNoBorder === undefined ? false : settings.isNoBorder
        props.rootClass = convertStylesToStrings(
            [styles],
            settings.isNoBorder ? "form_no-border" : undefined,
            props.rootClass
        )
        props.errorClass = convertStylesToStrings(
            [styles],
            "form__authorization-error",
            props.errorClass
        )
        super(params)
    }

    showError() {
        const { content } = this

        if (content !== null) {
            const errorText = content.querySelector("#form-authorization-error")
            errorText?.classList.add(styles["form__authorization-error_show"])
        } else {
            throw new Error("Can not show error, because content is null")
        }
    }

    render(): [string, Props] {
        return [
            /*html*/ `
            <form class="{{rootClass}}">
                {{#if formHeaderText}}
                    <p>
                        {{formHeaderText}}
                    </p>
                {{/if}}
                {{#each Inputs}}
                    {{{this}}}
                {{/each}}
                {{#if errorText}}
                    <p class={{errorClass}} id="form-authorization-error">
                        {{errorText}}
                    </p>
                {{/if}}
                {{#if SubmitButton}}
                    {{{SubmitButton}}}
                {{/if}}
            </form>
        `,
            this.props
        ]
    }
}
