import { registerRootComponent } from 'expo';
import React from 'react';
import { SafeAreaView, Text, ScrollView, Platform } from 'react-native';
import App from './App';

if (Platform.OS === 'web' && typeof document !== 'undefined' && !document.getElementById('web-frame')) {
  const s = document.createElement('style');
  s.id = 'web-frame';
  s.textContent = `
    html,body{margin:0}
    @media (min-width:720px){
      body{background:linear-gradient(135deg,#e1e8ff,#eef2ff);min-height:100vh}
      #root{width:460px;max-width:100%;height:min(860px, calc(100vh - 48px));margin:24px auto;background:#fff;border-radius:36px;overflow:hidden;box-shadow:0 24px 70px rgba(15,23,42,.22)}
    }`;
  document.head.appendChild(s);
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', padding: 20 }}>
          <Text style={{ color: 'red', fontSize: 24, fontWeight: 'bold', marginBottom: 15 }}>Falha ao iniciar</Text>
          <ScrollView>
            <Text style={{ color: 'orange', fontSize: 14, marginBottom: 20 }}>
              {this.state.error && this.state.error.toString()}
            </Text>
            <Text style={{ color: 'gray', fontSize: 12 }}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </Text>
          </ScrollView>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

function Root() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

registerRootComponent(Root);
