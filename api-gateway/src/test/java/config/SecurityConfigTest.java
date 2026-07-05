package config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DisplayName("Security Config Unit Tests")
class SecurityConfigTest {

    private final SecurityConfig securityConfig = new SecurityConfig();

    @Test
    @DisplayName("Should have @Configuration annotation")
    void testClassAnnotation() {
        assertTrue(SecurityConfig.class.isAnnotationPresent(Configuration.class));
    }

    @Test
    @DisplayName("Should have @EnableWebFluxSecurity annotation")
    void testEnableWebFluxSecurityAnnotation() {
        assertTrue(SecurityConfig.class.isAnnotationPresent(EnableWebFluxSecurity.class));
    }

    @Test
    @DisplayName("Should have @Bean annotation on securityWebFilterChain method")
    void testBeanAnnotation() throws NoSuchMethodException {
        Method method = SecurityConfig.class.getMethod("securityWebFilterChain",
                ServerHttpSecurity.class);
        assertTrue(method.isAnnotationPresent(org.springframework.context.annotation.Bean.class));
    }

    @Test
    @DisplayName("Should return SecurityWebFilterChain type")
    void testReturnType() throws NoSuchMethodException {
        Method method = SecurityConfig.class.getMethod("securityWebFilterChain",
                ServerHttpSecurity.class);
        assertEquals(SecurityWebFilterChain.class, method.getReturnType());
    }

    @Test
    @DisplayName("Should accept ServerHttpSecurity parameter")
    void testParameterTypes() throws NoSuchMethodException {
        Method method = SecurityConfig.class.getMethod("securityWebFilterChain",
                ServerHttpSecurity.class);
        Class<?>[] paramTypes = method.getParameterTypes();
        assertEquals(1, paramTypes.length);
        assertEquals(ServerHttpSecurity.class, paramTypes[0]);
    }

    @Test
    @DisplayName("Should configure and build security filter chain")
    void testSecurityWebFilterChain() {
        SecurityWebFilterChain mockChain = mock(SecurityWebFilterChain.class);
        ServerHttpSecurity mockHttp = createBuilderMock(mockChain);

        SecurityWebFilterChain result = securityConfig.securityWebFilterChain(mockHttp);

        assertNotNull(result);
        assertEquals(mockChain, result);
        verify(mockHttp).build();
    }

    @Test
    @DisplayName("Should call csrf on ServerHttpSecurity")
    void testCsrfCalled() {
        SecurityWebFilterChain mockChain = mock(SecurityWebFilterChain.class);
        ServerHttpSecurity mockHttp = createBuilderMock(mockChain);

        securityConfig.securityWebFilterChain(mockHttp);

        verify(mockHttp).csrf(any());
    }

    @Test
    @DisplayName("Should call authorizeExchange on ServerHttpSecurity")
    void testAuthorizeExchangeCalled() {
        SecurityWebFilterChain mockChain = mock(SecurityWebFilterChain.class);
        ServerHttpSecurity mockHttp = createBuilderMock(mockChain);

        securityConfig.securityWebFilterChain(mockHttp);

        verify(mockHttp).authorizeExchange(any());
    }

    @Test
    @DisplayName("Should call oauth2ResourceServer on ServerHttpSecurity")
    void testOAuth2ResourceServerCalled() {
        SecurityWebFilterChain mockChain = mock(SecurityWebFilterChain.class);
        ServerHttpSecurity mockHttp = createBuilderMock(mockChain);

        securityConfig.securityWebFilterChain(mockHttp);

        verify(mockHttp).oauth2ResourceServer(any());
    }

    @Test
    @DisplayName("Should execute full security configuration chain")
    void testFullSecurityConfiguration() {
        SecurityWebFilterChain mockChain = mock(SecurityWebFilterChain.class);
        ServerHttpSecurity mockHttp = createBuilderMock(mockChain);

        SecurityWebFilterChain result = securityConfig.securityWebFilterChain(mockHttp);

        assertNotNull(result);
        assertEquals(mockChain, result);
        verify(mockHttp).csrf(any());
        verify(mockHttp).authorizeExchange(any());
        verify(mockHttp).oauth2ResourceServer(any());
        verify(mockHttp).build();
    }

    private ServerHttpSecurity createBuilderMock(SecurityWebFilterChain mockChain) {
        return mock(ServerHttpSecurity.class, invocation -> {
            if ("build".equals(invocation.getMethod().getName())) {
                return mockChain;
            }
            return invocation.getMock();
        });
    }
}
