
function Validator(formSelector) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement          
        }
    }

    var formRules = {}

    var validatorRules = {
        required(value) {
            return value ? undefined: "Vui long nhap truong nay"
        },
        email(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined: "Truong nay phai la email"
        },
        min(min) {
            return function(value) {
                return (value.length >= min) ? undefined: `Vui long nhap toi thieu ${min} ky tu`
            }
        },
        max(max) {
            return function(value) {
                return (value.length <= max) ? undefined: `Vui long nhap toi da ${max} ky tu`
            }
        }
    }

    var formElement = document.querySelector(formSelector)
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|')
            for (var rule of rules) {

                var ruleInfo
                var isRuleColon = rule.includes(':')
                if (isRuleColon) {
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }
                
                var ruleFunc = validatorRules[rule]
                if (isRuleColon) {
                    ruleFunc = ruleFunc(ruleInfo[1])
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] = [ruleFunc]
                }
            }
            input.onblur = handleValidate
            input.oninput = handleClearError
        }
        function handleValidate(e) { 
            var rules = formRules[e.target.name]
            var errorMessage

            for (var rule of rules) {
                    errorMessage = rule(e.target.value) 
                    if (errorMessage) break                 
            }
            if (errorMessage) {
                var formGroup = getParent(e.target, '.form-group')
                if (formGroup) {
                    formGroup.classList.add('invalid')
                    var formMessage = formGroup.querySelector('.form-message')
                    if (formMessage) {
                        formMessage.innerText = errorMessage
                    }
                }
            }
            return !errorMessage
                     
        }
        function handleClearError(e) {
            var formGroup = getParent(e.target, '.form-group')
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid')
                var formMessage = formGroup.querySelector('.form-message')
                if (formMessage) {
                    formMessage.innerText = ""
                }
            }
        }
        formElement.onsubmit = (e) => {
            e.preventDefault()
            var inputs = formElement.querySelectorAll('[name][rules]')
            var isValid = true
            for (var input of inputs) {
                if (!handleValidate({target: input})) {
                    isValid = false
                }             
            }
            if (isValid) {
                if (typeof this.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formValue = Array.from(enableInputs).reduce((values, input) => {
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                                break
                            case 'checkbox':
                                    if (input.checked) {
                                          if(Array.isArray(values[input.name])){
                                             values[input.name].push(input.value)
                                            } else {
                                                values[input.name] = [input.value] 
                                            } 
                                    }    
                                    if (!values[input.name]) {
                                         values[input.name] = ''
                                    }
                                break
                            case 'file':
                                values[input.name] = input.files
                                break
                            default:
                                values[input.name] = input.value
                        }
                        return values
                    }, {})
                    return this.onSubmit(formValue)
                }
                formElement.submit()   
            }
        }
    }
}

export default Validator