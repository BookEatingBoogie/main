export async function postCharacter(payload) {
  try {
    const url = `${process.env.REACT_APP_API_BASE_URL}/character`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return {
        success: response.ok && data.charImg && data.charId !== undefined, //오류나면 === 'success'
        charImg: data.charImg,
        charId: data.charId,
        ...data,
      };
    } else {
      // 텍스트만 응답으로 오는 경우 (예: 이미지 URL)
      const imageUrl = await response.text();
      return {
        success: response.ok,
        charImg: imageUrl,
        charId: null,
      };
    }
  } catch (error) {
    console.error('❌ postCharacter fetch error:', error);
    return {
      success: false,
      message: '네트워크 오류 또는 서버에 연결할 수 없습니다.',
    };
  }
}