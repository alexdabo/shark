import * as React from 'react'

interface Props {
  name: iconName
  size?: number
  color?: string
}

export default (props: Props): JSX.Element => {
  const { name, size, color } = props
  return <div style={{ color: color }}>{icon(name, size)}</div>
}

/* prettier-ignore */
const icon = (name: iconName, size?: number): JSX.Element => {
    let element: JSX.Element = <div></div>

    switch (name) {
        case 'Play':
            element =
                <div><svg className="bi bi-play" width={`${size || 1}em`} height={`${size || 1}em`} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M 14.157717,8.250001 4.0001054,2.2622062 V 14.237795 Z m 1.386084,-1.2377507 a 1.4035845,1.4262581 0 0 1 0,2.4755007 L 4.4078799,16.053517 C 3.4978251,16.590587 2.25,15.977047 2.25,14.815767 V 1.6842338 c 0,-1.16128003 1.2478251,-1.77482003 2.1578799,-1.23775023 z" clipRule="evenodd" />
                </svg></div>
            break;
        case 'PlayFill':
            element =
                <div><svg className="bi bi-play-fill" width={`${size || 1}em`} height={`${size || 1}em`} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 15.542348,9.4884342 4.4076441,16.05107 C 3.4626905,16.607436 2.25,15.933753 2.25,14.812132 V 1.6868613 c 0,-1.11984296 1.2109406,-1.79530386 2.1576441,-1.23715986 L 15.542348,7.0123369 a 1.4034311,1.4255779 0 0 1 0,2.4760973 z" />
                </svg></div>
            break;

        case 'Stop':
            element =
                <div><svg className="bi bi-stop" width={`${size || 1}em`} height={`${size || 1}em`} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M 1,4.083 A 2.33,2.33 0 0 1 3.33,1.75 H 12.666667 A 2.33,2.33 0 0 1 15,4.083 V 13.416667 A 2.33,2.33 0 0 1 12.666667,15.75 H 3.33 A 2.33,2.33 0 0 1 1,13.416667 Z M 3.33,3.3055556 A 0.77,0.77 0 0 0 2.5555556,4.083 v 9.337 a 0.77,0.77 0 0 0 0.77,0.77 h 9.337 a 0.77,0.77 0 0 0 0.77,-0.77 V 4.083 A 0.77,0.77 0 0 0 12.666667,3.3055556 Z" clipRule="evenodd" />
                </svg></div>
            break;

        case 'StopFill':
            element =
                <div><svg className="bi bi-stop-fill" width={`${size || 1}em`} height={`${size || 1}em`} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 3.33,1.75 H 12.666667 A 2.33,2.33 0 0 1 15,4.083 V 13.416667 A 2.33,2.33 0 0 1 12.666667,15.75 H 3.33 A 2.33,2.33 0 0 1 1,13.416667 V 4.083 A 2.33,2.33 0 0 1 3.33,1.75 Z" />
                </svg></div>
            break;

        case 'Window':
            element =
                <div><svg className="bi bi-window" width={`${size || 1}em`} height={`${size || 1}em`} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M15 6H1V5h14v1z" clipRule="evenodd" />
                    <path d="M3 3.5a.5.5 0 11-1 0 .5.5 0 011 0zm1.5 0a.5.5 0 11-1 0 .5.5 0 011 0zm1.5 0a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg></div>
            break;
    }
    return element
}

type iconName = 'Play' | 'PlayFill' | 'Stop' | 'StopFill' | 'Window'
