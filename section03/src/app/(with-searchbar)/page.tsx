import ClientComponent from "./client-component";
import styles from "./page.module.css";
import ServerComponent from "./server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}

// 폴더 이름을 소괄호로 묶으면 라우트 그룹이 됨
// 라우트 그룹은 경로에 어떠한 영향도 미치지 않음
// 라우트 그룹에 속한 경로만 layout 설정 가능

// app router 는 기본적으로 모두 server component (브라우저 x)
// 그렇기 때문에 useEffect 처럼 브라우저에서만 사용 가능한 react hook 실행 불가능
// 최상단에 "use client"; 문구 삽입하면 client component 로 설정됨
// 일단 server 측에서 한 번 실행된 다음에 브라우저에서 한 번 더 실행되는 것

// 상호작용이 필요한 component들은 client component 로 설정하면 됨
// 클릭시 이동 정도는 <a></a> 정도의 html 기능이기 때문에 server component 가능

/* server component 주의사항
1. 서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안 된다
  : 브라우저에서 실행되는 기능을 담고 있는 라이브러리 import 도 불가능

2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않는다
  : 사전 렌더링을 진행할 때 서버에서 한 번 실행, 이후 하이드레이션을 위해 클라이언트에서 또 실행

3. 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다
  : use client 지시자가 작성되어 있는 컴포넌트 안에서는 서버 컴포넌트 import 불가능
  : 클라이언트 컴포넌트는 서버, 클라이언트 모두 각 한 번씩 실행되지만
  : 서버 컴포넌트의 코드는 오직 서버에서만 딱 한 번 실행되기 때문에
  : 하이드레이션을 위해 한 번 더 실행되는 과정에 서버 컴포넌트가 존재하지 않기 때문임!!
  : 이런 경우 Next.js 가 서버 컴포넌트를 자동으로 클라이언트 컴포넌트로 바꿔 버림 (오류 방지)
  : 반드시 클라이언트 컴포넌트 내에 서버 컴포넌트가 import 되어야 하는 경우
  : 클라이언트 컴포넌트 내에서 children 태그로 받아서 렌더링하는 방법 사용 권장

4. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화되지 않는 props는 전달 불가능하다
  * 직렬화 : 객체, 배열, 클래스 등의 복잡한 구조의 데이터를 네트워크상으로 전달하기 위해 아주 단순한 형태(문자열, byte)로 변환하는 것
  : 함수는 직렬화 불가능
  : 서버 컴포넌트 -> 클라이언트 컴포넌트의 구조를 가지고 있을 때 
  : 직렬화 안 된 데이터를 props로 클라이언트 컴포넌트에 전달이 안 됨
  * RSC Payload  (React server Component의 순수한 데이터) : React server Component를 직렬화한 결과
  : RSC Payload 에는 서버 컴포넌트의 모든 데이터가 포함, 클라이언트 컴포넌트보다 먼저 실행
  : 이 과정에 있어서, 클라이언트 컴포넌트의 함수는 직렬화될 수 없기 때문에 불가능한 것!!
*/
