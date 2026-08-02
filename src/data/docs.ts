export const docs = [
  {
    slug: "python",
    title: "Python",
    summary: "파이썬 기본 흐름과 실무에서 자주 쓰는 패턴을 정리한 문서입니다.",
    modeTitle: "파이썬 정리",
    modeLabel: "Python notes",
    sections: [
      {
        id: "overview",
        group: "시작하기",
        title: "Python 개요",
        eyebrow: "Overview",
        lead: "Python은 자동화, 데이터 처리, 백엔드 도구 작성에 폭넓게 쓰이는 범용 언어입니다.",
        body: [
          "처음에는 문법보다 실행 흐름, 파일 구조, 패키지 관리 방식을 먼저 잡는 것이 좋습니다.",
          "작은 스크립트로 시작해 함수, 모듈, 가상환경 순서로 확장하면 관리하기 쉽습니다.",
        ],
      },
      {
        id: "environment",
        group: "기본 설정",
        title: "가상환경과 패키지",
        eyebrow: "Environment",
        lead: "프로젝트마다 독립된 가상환경을 두면 의존성 충돌을 줄일 수 있습니다.",
        body: [
          "python -m venv .venv로 환경을 만들고, Windows에서는 .venv\\Scripts\\activate로 활성화합니다.",
          "패키지는 pip install로 추가하고 requirements.txt나 pyproject.toml에 기록해 재현 가능하게 관리합니다.",
        ],
      },
      {
        id: "patterns",
        group: "실전 패턴",
        title: "자주 쓰는 작성 패턴",
        eyebrow: "Patterns",
        lead: "반복 실행되는 코드는 함수로 분리하고, 외부 입력은 검증한 뒤 처리합니다.",
        body: [
          '스크립트 진입점은 if __name__ == "__main__" 블록으로 분리하면 import와 실행을 구분할 수 있습니다.',
          "파일 경로는 pathlib.Path를 사용하면 운영체제 차이를 줄일 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "nestjs",
    title: "NestJS",
    summary: "NestJS 프로젝트 구조와 요청 처리 흐름을 정리한 문서입니다.",
    modeTitle: "NestJS 정리",
    modeLabel: "Backend notes",
    sections: [
      {
        id: "overview",
        group: "시작하기",
        title: "NestJS 개요",
        eyebrow: "Overview",
        lead: "NestJS는 Node.js 위에서 구조화된 서버 애플리케이션을 만들기 위한 프레임워크입니다.",
        body: [
          "모듈은 기능 단위를 묶고, 컨트롤러는 요청을 받고, 서비스는 비즈니스 로직을 담당합니다.",
          "의존성 주입을 기본으로 사용하므로 파일 역할을 명확히 나누는 것이 중요합니다.",
        ],
      },
      {
        id: "module-flow",
        group: "구조",
        title: "모듈 흐름",
        eyebrow: "Module flow",
        lead: "기능을 추가할 때는 module, controller, service, dto 순서로 경계를 잡습니다.",
        body: [
          "Controller는 HTTP 요청과 응답 형태에 집중하고, Service는 데이터 처리와 규칙에 집중합니다.",
          "DTO와 validation pipe를 함께 쓰면 입력값을 초기에 검증할 수 있습니다.",
        ],
      },
      {
        id: "operation",
        group: "운영",
        title: "운영 체크포인트",
        eyebrow: "Operation",
        lead: "환경변수, 예외 처리, 로그 정책은 서비스가 커지기 전에 먼저 정리해야 합니다.",
        body: [
          "ConfigModule로 환경변수를 관리하고, 민감한 값은 저장소에 커밋하지 않습니다.",
          "공통 예외 필터나 인터셉터를 사용하면 응답 형식을 일정하게 유지할 수 있습니다.",
        ],
      },
    ],
  },
  {
    slug: "react",
    title: "React",
    summary: "React의 기본 개념과 컴포넌트 설계 기준을 정리한 문서입니다.",
    modeTitle: "React 정리",
    modeLabel: "Frontend notes",
    sections: [
      {
        id: "overview",
        group: "시작하기",
        title: "React 개요",
        eyebrow: "Overview",
        lead: "React는 UI를 컴포넌트 단위로 나누고 상태 변화에 따라 화면을 갱신하는 라이브러리입니다.",
        body: [
          "컴포넌트는 작게 만들고 props로 필요한 데이터만 넘기는 것이 유지보수에 유리합니다.",
          "상태는 실제로 화면을 바꾸는 값에만 두고, 계산 가능한 값은 렌더링 중에 계산합니다.",
        ],
      },
      {
        id: "state",
        group: "핵심 개념",
        title: "상태와 props",
        eyebrow: "State and props",
        lead: "props는 부모가 내려주는 값이고, state는 컴포넌트가 기억해야 하는 값입니다.",
        body: [
          "같은 상태가 여러 컴포넌트에서 필요하면 가장 가까운 공통 부모로 끌어올립니다.",
          "상태 업데이트는 이전 값에 의존할 때 함수형 업데이트를 사용하면 안전합니다.",
        ],
      },
      {
        id: "components",
        group: "설계",
        title: "컴포넌트 설계",
        eyebrow: "Components",
        lead: "컴포넌트는 데이터 표시, 입력 처리, 레이아웃 역할을 섞지 않는 편이 좋습니다.",
        body: [
          "반복되는 UI는 재사용 컴포넌트로 분리하고, 페이지 전용 로직은 페이지 가까이에 둡니다.",
          "폼, 리스트, 모달처럼 상태가 많은 UI는 제어 흐름을 먼저 정리한 뒤 구현합니다.",
        ],
      },
    ],
  },
] as const;

export type Doc = (typeof docs)[number];
