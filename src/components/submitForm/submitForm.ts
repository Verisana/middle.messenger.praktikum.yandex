import styles from "./submitForm.css"
import { convertStylesToStrings } from "../../utils/utils"
import { ISubmitFormParams, ISubmitFormProps } from "./types"
import { Block } from "../block"

export class SubmitForm extends Block<ISubmitFormProps> {
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
      console.warn("Can not show error, because content is null")
    }
  }

  render(): [string, ISubmitFormProps] {
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
