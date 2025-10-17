interface KakaoShareParams {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  buttonText?: string;
}

export function shareToKakao(params: KakaoShareParams) {
  if (!window.Kakao) {
    alert("카카오톡 공유 기능을 사용할 수 없습니다.");
    return;
  }

  try {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: params.title,
        description: params.description,
        imageUrl: params.imageUrl,
        link: {
          mobileWebUrl: params.linkUrl,
          webUrl: params.linkUrl,
        },
      },
      buttons: [
        {
          title: params.buttonText || "자세히 보기",
          link: {
            mobileWebUrl: params.linkUrl,
            webUrl: params.linkUrl,
          },
        },
      ],
    });
  } catch (error) {
    console.error("Kakao share error:", error);
    alert("카카오톡 공유 중 오류가 발생했습니다.");
  }
}

export function shareToKakaoCustom(templateId: number, templateArgs: Record<string, string>) {
  if (!window.Kakao) {
    alert("카카오톡 공유 기능을 사용할 수 없습니다.");
    return;
  }

  try {
    window.Kakao.Share.sendCustom({
      templateId: templateId,
      templateArgs: templateArgs,
    });
  } catch (error) {
    console.error("Kakao custom share error:", error);
    alert("카카오톡 공유 중 오류가 발생했습니다.");
  }
}
