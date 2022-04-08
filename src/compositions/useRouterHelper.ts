import { useRoute } from 'vue-router'

export function useRouterHelper() {
  const route = useRoute()

  function getQueryParam(parameterName: string): string | undefined {
    const parameter = route.query[parameterName]
    if (parameter === undefined) return undefined

    if (Array.isArray(parameter)) {
      if (parameter[0] === null) return undefined
      return parameter[0]
    } else {
      if (parameter === null) return undefined
      return parameter
    }
  }

  function getQueryParamList(parameterName: string): string[] {
    const parameter = route.query[parameterName]
    if (parameter === undefined) return []

    if (Array.isArray(parameter)) {
      return parameter.filter<string>(
        (value): value is string => value !== null
      )
    } else {
      if (parameter === null) return []
      return [parameter]
    }
  }

  return { getQueryParam, getQueryParamList }
}
