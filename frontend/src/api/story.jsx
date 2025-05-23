export async function postStoryNext({ choice }) {
  try {
    console.log('📤 postStoryNext 호출됨, 보낼 choice:', choice);
    
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ choice }),
    });

    console.log('📥 서버 응답 status:', res.status);

    if (res.status === 201) {
      return {
        status: res.status,
        data: null, // body 없음
      };
    }

    const data = await res.json();
    console.log('📥 서버 응답 내용:', data);
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    console.error('❌ postStoryNext fetch error:', error);
    throw error;
  }
}